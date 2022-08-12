import React from "react";
import {Link }  from "react-router-dom";
import titulo from '../../img/logo_navbar.jpg'
import style from "./LandingPage.module.css"
export default function LandingPage(){
    return (
    <div className={style.contenedorLanding} >
       
        <img src={titulo} alt="titulo" className={style.logo} /> <br/>
        <Link to={'/home'}> 
           <button className={style.btnIngresar}>Ingresar</button>
        </Link>

        
    </div>
    ) 
}