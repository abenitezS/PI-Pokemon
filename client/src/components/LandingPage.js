import React from "react";
import {Link }  from "react-router-dom";
import titulo from "../img/tituloPokemon.png"
import style from "./LandingPage.module.css"
export default function LandingPage(){
    return (
    <div className={style.contenedorLanding} >
        <h1 >App </h1>
        <img src={titulo} alt="titulo" className={style.logo} /> <br/>
        <Link to={'/home'}> 
           <button className={style.btnIngresar}>Ingresar</button>
        </Link>

        
    </div>
    ) 
}