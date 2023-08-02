const url = 'https://www.mercadolivre.com.br';
const screen_size = {width:1280,height:720}
const price_interval = {min:0,max:1000, none:false}

const eng = {
    welcome:'Hi, my name is Jonas',
    proceed:'to proceed type y/n :',
    query_req: 'fine, now type what you looking for: ',
    searching: (arg) => `ok, I'll search for ${arg}, just a minute...`,
    price_interval: 'you want in a price interval of: ',
    max_results: 'max number of results: ',
    price_mgs: (args) => `looking from ${args[0]} to ${args[1]}`,
    exit:'see u later!',
}

const pt = {
    welcome:'Oi, meu nome é Jonas',
    proceed:'para proceguir digite y/n :',
    query_req: 'legal, agora digite oque você procura: ',
    searching: (arg) => `ok, vou procurar por ${arg}, só um momento...`,
    price_interval: 'você deseja uma margem de preço de: ',
    max_results: 'numero máximo de resultados: ',
    price_mgs: (args) => `procurando de ${args[0]} até ${args[1]}`,
    exit:'até mais!',
    results: (args) => `resultados pagina ${args}`
}

const langs = {eng,pt}

module.exports = {url,langs,screen_size}