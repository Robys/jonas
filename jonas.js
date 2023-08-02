
const prompt = require("prompt-sync")();
const { default: puppeteer } = require("puppeteer");
const {url,screen_size,langs} = require('./config')

var c = 1;
var ar = [];

init();

function init(){
    let val = prompt('select eng/pt:')

    console.log(val === 'eng' ? langs.eng.welcome : langs.pt.welcome);
    let input = prompt(val === 'eng' ? langs.eng.proceed : langs.pt.proceed);

    if(input === 'n'){
        close(val)
    }

    if(input === 'y'){
        let n_input = prompt(val === 'eng' ? langs.eng.query_req : langs.pt.query_req);
        let max = prompt(val === 'eng' ? langs.eng.max_results : langs.pt.max_results);
        input = prompt(val === 'eng' ? langs.eng.price_interval : langs.pt.price_interval);

        let splits = input.split('-')
        //console.log(splits)

        if(splits[0] === 'none'){
            console.log(val === 'eng' ? langs.eng.searching(splits) : langs.pt.searching(splits))
            pup(val,n_input,null);
        }
        else{

            console.log(val === 'eng' ? langs.eng.price_mgs(splits) : langs.pt.price_mgs(splits))
            pup(val,n_input,splits,max);
        }
    }

}


async function pup(val,input,interval,max){
    //const browser = await puppeteer.launch({headless:false}); //show browser
    const browser = await puppeteer.launch({headless:'new'});
    const page = await browser.newPage()

    await page.goto(url);
    await page.setViewport({width: screen_size.width, height: screen_size.height});
    await page.waitForSelector('#cb1-edit');
    
    await page.type('#cb1-edit',input);
    await Promise.all([page.waitForNavigation(),page.click('.nav-search-btn')]);

    await page.waitForSelector(".ui-search-item__group");

    /** non price interval search */
    if(interval === null)
        DisplaySearch(page,val,max)
    /** non price interval search */
    else{
        await page.waitForSelector(".andes-form-control__field");
        //data-testid="Maximum-price"
        await page.type('[data-testid="Minimum-price"]',interval[0]);
        await page.type('[data-testid="Maximum-price"]',interval[1]);

        await page.waitForSelector('[data-testid="submit-price"]');

        await page.click('[data-testid="submit-price"]')
        DisplaySearch(page,val,max)
    }

   
}

async function DisplaySearch(page,val,max){

    const links = await page.$$eval(".ui-search-item__group > a",
   n => n.map(link => link.href));

   for(let i = 0; i < links.length; i++){

    //console.log(val === 'eng' ? langs.eng.results(c) : langs.pt.results(c));
    await page.goto(links[i])
    await page.waitForSelector('.ui-pdp-title')

    const title = await page.$eval('.ui-pdp-title', el => el.innerText)
    const price = await page.$eval('.andes-money-amount__fraction', el => el.innerText)

    var link = links[i]
    const obj = {i,title,price,link}
    ar.push(obj)

    c++;

    if(i >= links.length || i >= max) 
        ExportResults(val)
   }

}


function ExportResults(val){
    ar.map(items => console.log(`${items.i}# ${items.title} - ${items.price} - ${items.link}`))
    close(val)

}

function close(val){
        console.log(val === 'eng' ? langs.eng.exit : langs.pt.exit);
        setTimeout(() =>{
            
        },10000)
        process.exit()

}

/**
 * 
 *     const browser = await puppeteer.launch({headless:false});
    
    try{
        const page = await browser.newPage()
        await page.content(
            obj.map(item => `<p>${item}</p>`)
        )
    }
    catch(err){
        console.log(err)
    }
 */