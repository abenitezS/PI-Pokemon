import React from 'react'
import {useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getPokemonById } from './actions/index'
import  './Card.css'

export default function CardDetails(props){
    console.log(useParams())
    const {id} =useParams()

    const dispatch=useDispatch()
    
    React.useEffect( ()=>{
        dispatch(getPokemonById(id));

    },[dispatch])
    const myPokemon=useSelector(state=>state.pokemon)
console.log(myPokemon)

let i=0;
return(
    
    <div>
        {
          
            <div>
                 <h3> Numero: {myPokemon.id}</h3>
             
             <img className="imagenCard" src={myPokemon.image} alt='img not found' />  
              <h1 className="nombreCard" > Nombre: {myPokemon.name}</h1>       
           
             {myPokemon.types?.map((t) => {
               i++;
              return <h5 key={i}  className="typesCard"> {t.name} </h5>;
                })
               
            }
            <h1>Estadisticas</h1>
            <h4>Vida: {myPokemon.hp}</h4>
            <h4>Ataque:{myPokemon.attack}</h4>
            <h4>Defensa{myPokemon.defense}</h4>
            <h4>Velocidad{myPokemon.speed}</h4>

            <h3>Altura:{myPokemon.heigth} Peso:{myPokemon.weight} </h3>
          </div>    
         }
         <Link to={`/home`}>
            <button>Volver</button>
        </Link>
        
    </div>
)
}