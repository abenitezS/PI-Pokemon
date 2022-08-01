import React from 'react'
import {Link,useHistory, useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getPokemonById,cleanCache } from './actions/index'
import  style from './Card.module.css'
import ErrorMsj from './ErrorMsj'



export default function CardDetail(){
    console.log(useParams())
    const {id} =useParams()
    const history=useHistory()

    const dispatch=useDispatch()
    
    React.useEffect( ()=>{
        dispatch(getPokemonById(id));

    },[dispatch,id])
    const myPokemon=useSelector(state=>state.pokemon)
console.log(myPokemon)



let cleanAndBack = () => {
    history.push('/home')
    dispatch(cleanCache());
  };
let i=0;
 

return(
    myPokemon.error ?
    <ErrorMsj/> :
    myPokemon.length===0 ?
    <ErrorMsj/>
    :
    <div className={style.detail}>
        {       
            <div className={style.contenedorCard}>
                 <h3> Numero: {myPokemon.id}</h3>
             
             <img className={style.imagenCard} src={myPokemon.image} alt='img not found' />  
              <h4 className={style.nombreCard} >  {myPokemon.name.toUpperCase()}</h4>       
           
             {myPokemon.types?.map((t) => {
               i++;
              return <h5 key={i}  className={style.nombreCard}> {myPokemon.createdInDB ? t.name : t} </h5>;
                })
               
            }
            <h5>Estadisticas</h5>
            <div  className={style.typesCard} >Vida: {myPokemon.hp}</div>
            <div className={style.typesCard}> Ataque: {myPokemon.attack}</div>
            <div className={style.typesCard}>Defensa: {myPokemon.defense}</div>
            <div className={style.typesCard} >Velocidad: {myPokemon.speed}</div>

            <h5>Altura: {myPokemon.height}     Peso: {myPokemon.weight} </h5>
          </div>    
         }
         <Link to={`/home`}>
            <button onClick={cleanAndBack}>Volver</button>
        </Link>
        
    </div>
)
}