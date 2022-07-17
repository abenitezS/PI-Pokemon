import React from  "react";
import  './Card.css'
import { NavLink } from "react-router-dom";


 export default function Card({ name, image , types, idPokemon}){
    let i = 0;
    return (
        <div className="contenedorCard">
            <h1 >{idPokemon}</h1>
            <NavLink className="navlink" to={`/pokemons/${idPokemon}`}>
             <img className="imagenCard" src={image} alt='img not found' />  
             <h3 className="nombreCard" >{name}</h3>       
            </NavLink>
            { types?.map((t) => {
              i++;
              return <h5 key={i}  className="typesCard"> {t} </h5>;
            })
        }
            
        </div>
    )
 }

