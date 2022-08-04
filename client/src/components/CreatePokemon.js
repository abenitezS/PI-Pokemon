
import React, { useState } from 'react'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,Link } from 'react-router-dom';
import { cleanCacheAll, createPokemon, getAllPokemons, getAllTypes } from './actions';
import style from "./CrearPokemon.module.css";


export default function CrearPokemon() {
    let [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: []
    })
    let [errors, setErrors] = useState({});


    const dispatch = useDispatch();
    const type = useSelector(state => state.types);
    const pokemons = useSelector(state => state.pokemons);
    const history = useHistory();


    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, [dispatch]);


    let handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    let handleSubmit = e => {
           e.preventDefault();
        //    input.name=5555
        dispatch(createPokemon(input)); 
         
        dispatch(cleanCacheAll());
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            image: "",
            types: []
        })
       history.push("/home");
    }

  
    let validate = input => {
        let  isAlpha =/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/
        let errors = {};
        let search = pokemons.find(e => e.name.toLowerCase() === input.name.toLowerCase());
        if (search) errors.name = "Ya existe un pokémon con ese nombre"
        if (!input.name || input.name.length > 150 ||input.name.length < 4 ) errors.name = "El nombre debe tener entre 4 y 150 caracteres"
        if (!isAlpha.test(input.name)) errors.name = "El nombre debe tener solo letras"
        if (input.name[0] === " ") errors.name = "El primer caracter no puede ser un espacio"
        if ((input.hp )&&(input.hp > 200 || input.hp < 10 || !Number.isInteger(Number(input.hp)))) errors.hp = "El valor debe estar entre 10 y 200" 
        if  ((input.attack)&& (input.attack > 190 || input.attack <5 || !Number.isInteger(Number(input.attack)))) errors.attack = "El valor debe estar entre 5 y 190" 
        if((input.defense )&&(input.defense > 250 || input.defense < 5 || !Number.isInteger(Number(input.defense)))) errors.defense = "El valor debe estar entre 5 y 250" 
        if ((input.speed )&&(input.speed > 180 || input.speed < 5 || !Number.isInteger(Number(input.speed)))) errors.speed = "El valor debe estar entre 5 y 180" 
        if ((input.height )&&(input.height > 15 || input.height < 0.1 || !/^\d*\.?\d*$/.test(input.height))) errors.height = "El valor debe estar entre 0.1  y 15.0" 
        if ((input.weight )&&(input.weight > 1000 || input.weight < 0.1 || !/^\d*\.?\d*$/.test(input.weight))) errors.weight = "El valor debe estar entre 0.1 y 1000.0" 
        return errors;
    }
    

    let eliminarOpcion = e => {
        let filtrados = input.types?.filter(t => t !== Number(e.target.value))
        setInput({
            ...input,
            types: filtrados
        })
    }

    
    let checkTypes = (e) => {
        if (input.types.length === 2) {
            alert("No puedes elegir más de dos tipos")
            return null;
        }

        for (let i of input.types) {
            if (Number(e.target.value) === i) {
                return alert("No puedes elegir dos veces el mismo tipo");
            }
        }
    
        setInput({
            ...input,
            types: [...input.types, Number(e.target.value)]
        })
    }

  return (
      <>

<div className={style.containerBack}>
          <h1 className={style.titulo}>  Crear Pokémon </h1>
           <Link to={`/home`}>
            <button className={style.buttonBack}onClick={() => history.push("/home")}>{"<"} Volver</button>
        </Link>
     </div>
      
        <form  className={style.formCrear}onSubmit={(e)=> handleSubmit(e)}>
            <div>
               
                <label>   Nombre: </label>
                <input  type="text"  className={errors.name && style.danger} name='name' 
                value={input.name} onChange={e => handleInputChange(e)}/>
                {errors.name && <p className={style.danger}>{errors.name}</p>}
            </div>
            <br/>
            <div>
              
                <label>HP: </label>
                <input  type="number" className={errors.hp && style.danger}  name='hp'
                 value={input.hp} onChange={e => handleInputChange(e)}/>
              {errors.hp && <p className={style.danger}>{errors.hp}</p>}
            </div>
            <br/>
            <div>
                
                <label>Ataque: </label>
                <input type="number" className={errors.attack && style.danger} name='attack' 
                 value={input.attack}  onChange={e => handleInputChange(e)}/>
                 {errors.attack && <p className={style.danger}>{errors.attack}</p>}
            </div>
            <br/>
            <div>
                
                <label>Defensa: </label>
                <input  type="number" className={errors.defense && style.danger} name='defense'
                value={input.defense} onChange={e => handleInputChange(e)}/>
                {errors.defense && <p className={style.danger}>{errors.defense}</p>}
            </div>
            <br/>
            <div>
               
                <label>Velocidad: </label>
                <input  type="number" className={errors.speed && style.danger} name='speed'
                value={input.speed} onChange={e => handleInputChange(e)}/>
                {errors.speed && <p className={style.danger}>{errors.speed}</p>}
            </div>
            <br/>
            <div>
                
                <label>Altura: </label>
                <input  type="number" className={errors.height && style.danger} name='height'
                value={input.height} onChange={e => handleInputChange(e)}/>
                 {errors.height && <p className={style.danger}>{errors.height }</p>}
            </div>
            <br/>
            <div>
                
                <label>Peso: </label>
                <input type="number" className={errors.weight && style.danger}  name='weight'
                 value={input.weight} onChange={e => handleInputChange(e)}/>
                {errors.weight && <p className={style.danger}>{errors.weight }</p>}
                
            </div>
            <br/>
            <div>
                <label>URL de imagen: </label>
                <input  type="text" name="image" value={input.image} onChange={e => handleInputChange(e)} />
            </div>
            <br/>
            <div>
                <label>Tipo/s (máx. 2): </label>
                <select  name="type" onChange={(e) => checkTypes(e)}>
                    <option disabled >Elegir:</option>
                    {
                        type?.map(t => {
                            return (
                                <option value={t.id} key={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>
                {
                    /*Acá me renderiza los nombres de los tipos seleccionados*/
                    input.types?.map(t => {
                        let tipo = type.find(obj => obj.id === t);
                        return (
                            <div key={tipo.id} className={style.contenedorTypeSelected}>
                                <p>{tipo.name}</p>
                                <button className={style.btnTypeSelected} type='button' value={tipo.id} onClick={e => eliminarOpcion(e)}>X</button>
                            </div>
                        )
                    })
                }
            </div>
            <br/>
            <div>
                <button disabled={!input.name || Object.keys(errors).length > 0} type="submit"  className={style.buttonReset}>Crear Pokemon</button>
            </div>
        </form>
    </>
  )
}