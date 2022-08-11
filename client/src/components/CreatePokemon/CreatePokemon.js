
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,Link } from 'react-router-dom';
import { cleanCacheAll, createPokemon, getAllPokemons,
     getAllTypes } from '../../Redux/actions/index.js'
import style from "./CrearPokemon.module.css";
import Loading from '../Loading/Loading'

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


    async function handleSubmit(e)  {
           e.preventDefault();
        //    input.name=5555
      await  dispatch(createPokemon(input));
        dispatch(cleanCacheAll)
       await dispatch(getAllPokemons)
        alert (`Pokemon ${input.name} creado`);
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
   //history.push(`/home`);
    }
    let handleBack=(e) =>{
        e.preventDefault();
        
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
    pokemons.length<2?
    <Loading/>
    :
      <>

<div className={style.containerBack}>
          <h1 className={style.titulo}> Crear Pokémon </h1>
           <Link to={`/home`}>
            <button className={style.buttonBack}onClick={e=>handleBack(e)}>{"<"} Volver</button>
        </Link>
     </div>
      
        <form  className={style.formCrear} onSubmit={(e)=> handleSubmit(e)}>
            <div>
               
                <label>Nombre </label><br/>
                <input  type="text" placeholder='Nombre Pokémon' name='name'
                className={errors.name? style.danger: style.inputName}  
                value={input.name} onChange={e => handleInputChange(e)}/>
                {errors.name && <p className={style.danger}>{errors.name}</p>}
            </div>
            
            <div>
              
                <label>HP </label> <br/>
                <input  type="number" placeholder='Vida' name='hp'
                className={errors.hp? style.danger: style.inputOtros}  
                 value={input.hp} onChange={e => handleInputChange(e)}/>
              {errors.hp && <p className={style.danger}>{errors.hp}</p>}
            </div>
          
            <div>
                
                <label>Ataque</label>  <br/>
                <input type="number" placeholder='Ataque' name='attack' 
                className={errors.attack? style.danger: style.inputOtros} 
                 value={input.attack}  onChange={e => handleInputChange(e)}/>
                 {errors.attack && <p className={style.danger}>{errors.attack}</p>}
            </div>
            
            <div>
                
                <label>Defensa </label> <br/>
                <input  type="number" placeholder='Defensa' name='defense'  
                className={errors.defense? style.danger: style.inputOtros} 
                value={input.defense} onChange={e => handleInputChange(e)}/>
                {errors.defense && <p className={style.danger}>{errors.defense}</p>}
            </div>
           
            <div>
               
                <label>Velocidad </label> <br/>
                <input  type="number" name='speed'  placeholder='Velocidad'
                className={errors.speed ? style.danger: style.inputOtros} 
                value={input.speed} onChange={e => handleInputChange(e)}/>
                {errors.speed && <p className={style.danger}>{errors.speed}</p>}
            </div>
            
            <div>
                
                <label>Altura: </label> <br/>
                <input  type="number" name='height'  placeholder='Altura'
                className={errors.height? style.danger: style.inputOtros} 
                value={input.height} onChange={e => handleInputChange(e)}/>
                 {errors.height && <p className={style.danger}>{errors.height }</p>}
            </div>
            
            <div>
                
                <label>Peso: </label> <br/>
                <input type="number" name='weight'  placeholder='Peso'
                className={errors.weight? style.danger: style.inputOtros}   
                 value={input.weight} onChange={e => handleInputChange(e)}/>
                {errors.weight && <p className={style.danger}>{errors.weight }</p>}
                
            </div>
            
            <div>
                <label>URL de imagen: </label> <br/>
                <input  type="text" name="image" placeholder='Dirección imágen'
                className={style.inputName} value={input.image} onChange={e => handleInputChange(e)} />
              <img className={style.imagenCard} src={input.image} alt='' />  
            </div>
            <br/>
            <div>
                <label>Tipo/s (máx. 2): </label> <br/>
                <select  name="type" className={style.inputOtros}
                 onChange={(e) => checkTypes(e)}>
                    <option disabled >Elegir:</option>
                    {
                        type?.map(t => {
                            return (
                                <option value={t.id} key={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>
                 <div className={style.contenedorTypeSelected}>
                {
                   
                    /*Acá me renderiza los nombres de los tipos seleccionados*/
                    
                    input.types?.map(t => {
                        let tipo = type.find(obj => obj.id === t);
                        return (
                            <div key={tipo.id} className={style.contenedortype}>
                                <p>{tipo.name}</p>
                                <button className={style.btnTypeSelected} type='button' 
                                value={tipo.id} onClick={e => eliminarOpcion(e)}>X</button>
                            </div>
                        )
                    })
                    
                }
                </div>
            </div>
            <br/>
            <div>
                <button disabled={!input.name || Object.keys(errors).length > 0} type="submit" 
                 className={style.buttonCrear}>Crear Pokemon</button>
            </div>
        </form>
       
    </>
  )
}