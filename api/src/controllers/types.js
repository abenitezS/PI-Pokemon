const express=require('express')
const{Router}=require ('express');
const router=Router();
const axios = require("axios");
const {Type} = require("../db.js");

router.get('/', async (req, res, next) => {
        let tiposDB = await Type.findAll();
            if (tiposDB.length === 0) {
                try {
                    let {data} = await axios.get("https://pokeapi.co/api/v2/type/");
        
                    let urls = [];
                    data.results?.map(p => urls.push(p.url));
        
                    for (let i = 0; i < urls.length; i++) {
                        let {data} = await axios.get(urls[i]);
                        await Type.findOrCreate({
                            where: {
                                id: data.id,
                                name: data.name
                            }
                        })
                    }
        
                    let tipos = await Type.findAll();
                    return res.json(tipos);
                } catch (error) {
                    next(error);
                }
            }else{
                return res.json(tiposDB);
            }
    })

module.exports=router;