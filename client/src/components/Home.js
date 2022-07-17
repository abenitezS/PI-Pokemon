import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllPokemons,getAllTypes} from '../components/actions/index'
import {Link} from 'react-router-dom'
import Card from '../components/Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'

export default function Home() {
    const dispatch = useDispatch()

const allPokemons =useSelector(state=>state.pokemons)

//estados para el paginado 
const[currentPage,setCurrentPage]=useState(1)  // mi pagina actual que arranca en 1
const[pokemonsPerPage,setPokemonsPerPage]=useState(12) // paises por pagina siempre seran 12
const indexOfLastPokemons=currentPage * pokemonsPerPage //12
const indexOfFirstPokemons= indexOfLastPokemons - pokemonsPerPage //0
const currentPokemons=allPokemons.slice(indexOfFirstPokemons,indexOfLastPokemons)// me da los pokemons  para mi pagina actual

const paginado = (pageNumber)=>{  // me va a servit para el renderizado
  setCurrentPage(pageNumber)
}



useEffect(()=>{dispatch(getAllPokemons())},[dispatch])

function handlerlClick(e){
    e.preventDefault();
    dispatch(getAllPokemons());
      }

return(
    <div>
       

     <Link to= '/pokemons'>Pokemons</Link> 
      <h1>POKEMONS </h1>   
      
      <button onClick={e=>handlerlClick(e)}>
          Volver a cargar 
      </button>
     <div>
      <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
       />

     { currentPokemons?.map((e) => {
          return (
            <div key={e.idPokemon}>
              <Link to={"/home/"+ e.idPokemon }>
                <Card name={e.name} image={e.image} types={e.types} />
              </Link>
            </div>
        )
        })
             }
     </div>
    </div>
)
 }