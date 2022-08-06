const express=require('express')
const{Router}=require ('express');
const router=Router();
const axios = require("axios");
const {Pokemon, Type} = require("../db.js");


function crearObj(data) {
    return {
        id: data.id,
        name: data.name,// 4 a 150 https://hualao.com/es/what-is-the-name-of-the-longest-pokemon.html
        hp: data.stats[0].base_stat,// 10-200
        attack: data.stats[1].base_stat,//5-190
        defense: data.stats[2].base_stat,//5 a 250
        speed: data.stats[5].base_stat,//5-180
        height: data.height,//0,1..15,0 metros (decimales)
        weight: data.weight,///0.1 a 1000  (decimales)   https://pokemon.fandom.com/es/wiki/Lista_de_Pok%C3%A9mon_por_peso
        image: data.sprites.other.home.front_default,
        types: data.types.map(t => t.type.name)   //1 o 2 tipos permitidos https://pokemon.fandom.com/es/wiki/Lista_de_Pok%C3%A9mon_por_tipo
    }
}


router.get('/',async (req, res, next) => {
    let {name} = req.query;
    let pokemonsCreated = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"]
        }
    });

    if (!name || name === undefined) {
        try {
            let url ="https://pokeapi.co/api/v2/pokemon/"
            let  pokemons = []

           while(url!=null && pokemons.length<40) 
           {
            const {data} = await axios.get(url)           
            let auxPokemones= data.results?.map(e => {
                              return {name: e.name, url: e.url} //obtengo las urls y los nombres
                             } );
                pokemons.push(...auxPokemones);
                url=data.next
            } 

            let pokes = await Promise.all(pokemons.map(async e=>{
                let pokemon = await axios.get(e.url);
                return crearObj(pokemon.data);
            }))

            if (pokemonsCreated.length > 0) {
                pokemonsCreated = pokemonsCreated.map(p => {
                    return p.dataValues
                });
                pokes = pokes.concat(pokemonsCreated);
            }

            return res.json(pokes)
        } catch (error) {
            next(error);
        }
    }else{ //Si me pasan ?name=...
        try {
            if (pokemonsCreated.length === 0) {
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                return res.json(crearObj(data));
            } else {
                let find = await Pokemon.findOne({
                    where: {
                        name: name.toLowerCase()
                    },
                    include: {
                        model: Type,
                        attributes: ["name"]
                    }
                })
                if (find) {
                    return res.json(find);
                }
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                return res.json(crearObj(data));
            }
        } catch (error) {
            return res.status(404).json({msj: "No se encuentra el pokemon solicitado"});
        }
    }

})
router.get ( '/:id' , async (req, res) => {
        let {id} = req.params; 
        
        if (id.includes("-")) {
            try {
                let data = await Pokemon.findByPk(
                    id, {
                    include: {
                        model: Type,
                        atributes:["name"]
                      }   
                    }
                );
                return res.json(data);
            } catch (error) {
                return res.status(404).json({msj: "No se encuentra el pokemon solicitado"});
            }
        }else{
            try {
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);

                return res.json(crearObj(data));
            } catch (error) {
                return res.status(404).json({msj: "No se encuentra el pokemon solicitado"});
            }
        }
    })
    
   
 router.post("/", async (req, res, next) => {
        let {name, hp, attack, defense, speed, height, weight, image, types} = req.body;
        if (!image || image === undefined || image === "" || !/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(image)) {
            image = "https://img.icons8.com/clouds/500/pokemon-go.png";
        }
        if (!types || types.length === 0) types = [10001];  //puedo crear tipos no existentes????
        
        if ((!hp)|| (hp==="")) hp=null;
        if ((!attack)|| (attack==="")) attack=null;
        if (defense==="") defense=null;
        if (speed==="") speed=null;
        if (height==="") height=null;
        if (weight==="") weight=null;
        try {
            name = name.toLowerCase();
           const pokemonCreate = await Pokemon.create({name, hp, attack, defense, speed, height, weight, image});
            types.map(async idType=>{
                const foundType=await Type.findAll({
                    where:{id:idType},
                })
                if (foundType) pokemonCreate.addType(foundType)
            })

            return res.status(201).json(pokemonCreate);
        } catch (error) {
            return res.status(500).json({msj: "Error al crear el Pokemon "+ error});
        }
    })



router.delete("/:id" , async (req, res, next) => {
        let {id} = req.params;
        if (!id) return res.status(404).json({msj: "No se envió un ID"});
        try {
            await Pokemon.destroy({
                where: { id: id }
            });           
            return res.json({msj: "Pokémon eliminado"});
        } catch (error) {
            next(error);
        }
    })

 router.patch ('/:id', async (req, res, next) => {
   let {name, hp, attack, defense, speed, height, weight, image, type} = req.body;
   let {id} = req.params;
   if (!image || image === undefined || image === "" || !/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(image)) {
            image = "https://img.icons8.com/clouds/500/pokemon-go.png";
        }
   if (!type || type.length === 0) type = [10001];
        try {
            name = name.toLowerCase();
            let pokemon = {name, hp, attack, defense, speed, height, weight, image, type};
            await Pokemon.update({pokemon}, {where: {id: id}})
            return req.send(pokemon);
        } catch (error) {
            next(error);
        }
    }
)

module.exports=router;