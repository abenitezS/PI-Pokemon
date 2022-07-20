import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterByCreatedOrAPI, filterByType, getAllPokemons,getAllTypes,orderByAlphabet, orderByAttack} from '../components/actions/index'
import {Link} from 'react-router-dom'
import Card from '../components/Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'

export default function Home() {
  let [, setFiltrados] = useState();
    const dispatch = useDispatch()

const allPokemons =useSelector(state=>state.pokemons)

const alltypes=useSelector(state =>state.types)

console.log(alltypes )

//estados para el paginado 
const[currentPage,setCurrentPage]=useState(1)  // mi pagina actual que arranca en 1
const[pokemonsPerPage,]=useState(12) // pokemons por pagina siempre seran 12
const indexOfLastPokemons=currentPage * pokemonsPerPage //12
const indexOfFirstPokemons= indexOfLastPokemons - pokemonsPerPage //0
const currentPokemons=allPokemons.slice(indexOfFirstPokemons,indexOfLastPokemons)// me da los pokemons  para mi pagina actual

const paginado = (pageNumber)=>{  // me va a servit para el renderizado
  setCurrentPage(pageNumber)
}



useEffect(()=>{dispatch(getAllPokemons() )
  dispatch(getAllTypes())},[dispatch])



console.log(alltypes )

function handleClick(e){
    e.preventDefault();
    dispatch(getAllPokemons());
      }

function  handlefilterType(e){
    
  dispatch(filterByType(e.target.value));
    setFiltrados(`filtrado por Tipo ${e.target.value}`);
  setCurrentPage(1);
  }
function handelCreatedOrExisted(e){
  dispatch(filterByCreatedOrAPI(e.target.value));
  setFiltrados(`filtrado por origen ${e.target.value}`);
  setCurrentPage(1);
}
 
function handleOrderByName(e){
  e.preventDefault()
  dispatch(orderByAlphabet(e.target.value));
  setCurrentPage(1);
  setFiltrados(`Ordenado Alfabetico ${e.target.value}`) //me sirve para que modifique el estado local y se renderice
}

function handleOrderByAttack(e){
  e.preventDefault()
  dispatch(orderByAttack(e.target.value));
  setCurrentPage(1);
  setFiltrados(`Ordenado Alfabetico ${e.target.value}`) //me sirve para que modifique el estado local y se renderice
}

return(
    <div>  
     <Link to='/home'>Pokemons</Link> 
      <h1>POKEMONS </h1>   
      
      <button onClick={e=>handleClick(e)}>
          Volver a cargar 
      </button>

      <div>

        <select defaultValue="Filtrar por tipo:" name='order-type' onChange={e => handlefilterType(e)}>
          <option disabled>Filtrar por tipo:</option>
          <option value="default">Todos</option>
          {
            alltypes?.map(t => {
              return (
                <option value={t.name} key={t.id}>{t.name}</option>
              )
            })
          }
          </select>
        <select defaultValue="Creados o Existentes:" name='origen'onChange={e=>handelCreatedOrExisted(e)}>
          <label> Filtrar por Creados o Existentes</label>
          <option>Creados o Existentes:</option>
          <option value="Created">Creados</option>
          <option value="Existed">Existentes</option>
        </select>
        <select onChange={e => handleOrderByName(e)}>
            <option>Alfabéticamente</option>
            <option value="asc">Aa-Zz</option>
            <option value="desc">Zz-Aa</option>
          </select>


        <select onChange={e => handleOrderByAttack(e)}>
          <option>Orden por Ataque</option>
          <option value="asc">Menor a mayor ataque </option>
          <option value="desc">Mayor a menor ataque </option>
        </select>

      </div>
     <div>       
 
          <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
          />

            <SearchBar/>
        {currentPokemons?.map((e) => {
              return (
                <div key={e.id}>                
                  <Link to={`/home/${e.id} `}>
                    <Card 
                    
                    idPokemon={e.id} 
                    name={e.name} 
                    image={e.image} 
                    types={e.createdInDB ? e.types?.map(t => t.name) : e.types} />

                  </Link>
                </div>
            )
            })
                }
     </div>
    </div>
)
 }