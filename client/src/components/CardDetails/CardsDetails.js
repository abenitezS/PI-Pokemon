import React from 'react'
import {Link,useHistory, useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getPokemonById,cleanCache ,cleanCacheAll,deletePokemon} from '../../Redux/actions/index'
import  style from './CardDetails.module.css'
import ErrorMsj from '../ErrorMsj/ErrorMsj'
import Loading from '../Loading/Loading'


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
    dispatch(cleanCache());
    history.push('/home')
  };

let handleDelete = () => {
  let answer = window.confirm("¿Esta seguro de eliminar este Pokemon ?");
        if (answer) {
          dispatch(deletePokemon(id));
    dispatch(cleanCache());
    dispatch(cleanCacheAll());
    history.push("/home");
    window.location.reload()
    alert("Pokémon se ha eliminado");
        }
    
    
   }
  
 
let i=0;
return(
    myPokemon.error ?
    <ErrorMsj/> :
    myPokemon.length<2 ?
    <Loading/>
    :
    <>
     <div className={style.containerBack}>
          <h1 className={style.titulo}>  Detalle </h1>
           <Link to={`/home`}>
            <button className={style.buttonBack} onClick={cleanAndBack}>{"<"} Volver</button>
        </Link>
     </div>
    <div className={style.contenedorDetails}>
        {       
            <div className={style.contenedorCard}>
                 <h4> Numero: {myPokemon.id}</h4>
               <h2 className={style.nombreCard} >  {myPokemon.name.toUpperCase()}</h2>   
             <img className={style.imagenCard} src={myPokemon.image} alt='img not found' />  
                
           <div className={style.tipoDetails}>

            <div className={style.cardDetail}>
              {myPokemon.types?.map((t) => {
               i++;
              return <div key={i} > {myPokemon.createdInDB ? t.name : t} </div>;
                })
               
            }
            </div>
             
            <h4>Estadisticas</h4>
            </div >
            <div className={style.contenedorDetails2}>
            <div>   Vida: {myPokemon.hp}</div>
            <div> Ataque: {myPokemon.attack}</div>
            <div>Defensa: {myPokemon.defense}</div>
            <div>Velocidad: {myPokemon.speed}</div>
            </div>
            <h4>Altura: {myPokemon.height}</h4>   
            <h4>Peso: {myPokemon.weight} </h4>
          </div>    
         }
       
        
        {
          myPokemon.createdInDB && (
            <div className={style.contenedorDelete}>
              <button onClick={() => handleDelete()} className={style.btnDelete}>Borrar</button>
            </div>
          )
        }
        
    </div>
    </>
    
)
}