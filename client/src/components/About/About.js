import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory ,Link} from 'react-router-dom'
// import logo from "../../img/tituloPokemon.png"
import { cleanCache } from '../../Redux/actions'
import style from "./About.module.css"

export default function About() {

    const history = useHistory()
    const dispatch = useDispatch()

    let handleClick = () => {
      history.push("/home");
      dispatch(cleanCache())
    }

  return (
    <>
    
    <div className={style.containerBack}>
          <h1 className={style.titulo}> About </h1>
           <Link to={`/home`}>
        <button className={style.buttonBack} onClick={e=>handleClick(e)}>{"<-"} Volver</button>
        </Link>
     </div>
    <div className={style.contenedor}>
       
        <br/>
        {/* <img src={logo} alt="" className={style.logo}/> */}
        <div> 
          <h1>Proyecto Individual Henry Bootcamp.</h1>
         <h2>Esta aplicación se realizó con:</h2> 
         <li>React Js, </li><br/>
         <li> Redux en Frontend </li><br/>
         <li>Para el Backend se utilizó express js, </li> <br/>
          <li>Base de Datos se implementó  con sequelize y postgresql. </li> <br/>
         <h2> Actualmente se está trabajando en el diseño y mejoras funcionales . </h2> 
        </div>
        
    </div>
  
    
    </>
    
  )
}