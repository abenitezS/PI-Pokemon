import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory ,Link} from 'react-router-dom'
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
    <>
    <div className={style.containerBack}>
          <h1 className={style.titulo}> Error </h1>
           <Link to={`/home`}>
        <button className={style.buttonReset} onClick={e=>handleClick(e)}>{"<-"} Volver</button>
        </Link>
     </div>
    
    <div className={style.contenedor404}>
    
        <img src={error404} alt="" className={style.error404}/>
        <h4>No se encuentra pokémon con ese nombre</h4>
    </div>
    </>
  )
    
    
}