import React from  "react";
import  './Card.css'
import { NavLink } from "react-router-dom";


 export default function Card({idPokemon, name, image , types }){
    let i = 0;
    return (
        <div className="contenedorCard">
            
          
               <h3 >{idPokemon}</h3>
             <img className="imagenCard" src={image} alt='img not found' />  
            
             <h3 className="nombreCard" >{name}</h3>       
         
            { types?.map((t) => {
              i++;
              return <h5 key={i}  className="typesCard"> {t} </h5>;
            })
             }
            
        </div>
    )
 }

