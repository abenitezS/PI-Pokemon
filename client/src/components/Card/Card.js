import React from  "react";
import { Link } from "react-router-dom";
import style from './Card.module.css'

 export default function Card({idPokemon, name, image , types }){
    let i = 0;
    return (
        <div className={style.contenedorCard}>
           <Link  className={style.navlink} to={`/home/${idPokemon} `}>
             <h5>{idPokemon}</h5>
              <h3 className={style.nombreCard} >{name.toUpperCase()}</h3> 
               <img className={style.imagenCard} src={image} alt='img not found' />  <br/>
              { types?.map((t) => {
              i++;
              return <div key={i}  className={style.typesCard}> {t} </div>;
            })
             }  
           </Link>
            
           
            
        </div>
    )
 }

