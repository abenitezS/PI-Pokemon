import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import error404 from "../../img/not_found.jpg"
import { cleanCache } from '../../Redux/actions'
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
        <button className={style.buttonBack} onClick={e=>handleClick(e)}>{"<-"} Volver</button>
        <br/>
        <img src={error404} alt="" className={style.error404}/>
        <h4>No se encuentra pokémon con ese nombre</h4>
    </div>
  )
}