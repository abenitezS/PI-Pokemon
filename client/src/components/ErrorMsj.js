import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import error404 from "../img/not_found.jpg"
import { cleanCache } from './actions'
import style from "./ErrorMsj.module.css"

export default function Error404() {

    const history = useHistory()
    const dispatch = useDispatch()

    let handleClick = () => {
      history.push("/home");
      dispatch(cleanCache())
    }

  return (
    <div className={style.contenedor404}>
        <button onClick={e=>handleClick(e)} 
        className={style.button404}>{"<-"} Volver</button>
        <img src={error404} alt="" className={style.error404}/>
        <h4>No se ecuentra pokémon con ese nombre</h4>
    </div>
  )
}