import React from 'react'
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getPokemonByName,getAllPokemons} from './actions'
import { Redirect,useHistory} from "react-router-dom";
import style from './SearchBar.module.css'


export default function SearchBar () {
const dispatch =useDispatch()
const [name,setName]=useState('')
const history = useHistory();
let pokemon = useSelector(state => state.pokemon);

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
}
function handelSubmit(e) {
    e.preventDefault()
    if (name !== "") return dispatch(getPokemonByName(name));
    alert("Debes ingresar el nombre de un pokémon");
   
    
}


return (
  <div className={style.contenedorSearchbar} >
    
     <div className={style.contenedorButtonSearch}>
      <input className={style.inputSearch}
            type='text'
            placeholder='Bucar...'   
            onChange={(e)=>handleInputChange(e)} 
            />
     <button className={style.buttonSearch} type='submit' onClick={(e)=>handelSubmit(e)} >Buscar</button>
     
        </div>
     {pokemon.id &&  <Redirect to={`/home/${pokemon.id}`} />}
     
      <div className={style.contenedorButtonCrear}>
        <button onClick={() => history.push("/pokemon")} 
                className={style.buttonCrear}>CREAR POKÉMON</button>
      </div>  
      
    
 </div>
    )
}