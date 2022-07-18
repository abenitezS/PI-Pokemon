import React from 'react'
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getPokemonByName} from './actions'
import { Redirect} from "react-router-dom";

export default function SearchBar () {
const dispatch =useDispatch()
const [name,setName]=useState('')



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
  <div>
      <input 
            type='text'
            placeholder='Bucar...'   
            onChange={(e)=>handleInputChange(e)} 
            />
     <button type='submit' onClick={(e)=>handelSubmit(e)} >Buscar</button>

     {pokemon.id &&  <Redirect to={`/home/${pokemon.id}`} />}
 </div>
    )
}