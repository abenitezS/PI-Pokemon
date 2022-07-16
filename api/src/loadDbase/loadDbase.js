const express =require('express')
const axios = require('axios');
const { Type } = require('../db');

module.exports 
const LoadDB = async () =>{
    try {
    let {data} = await axios.get("https://pokeapi.co/api/v2/type/");// este me da las urls de los tipos 
        
    let urls = [];
    data.results?.map(p => urls.push(p.url));

    for (let i = 0; i < urls.length; i++) {
        let {data} = await axios.get(urls[i]);// esta me da los nombres y el id 
        await Type.findOrCreate({
            where: {
                id: data.id,
                name: data.name
            }
        })
    }

    let tipos = await Type.findAll();
    return tipos;
} catch (error) {
    console.log('Error tipos pokemon carga' + error);
}
}

module.exports = LoadDB;












