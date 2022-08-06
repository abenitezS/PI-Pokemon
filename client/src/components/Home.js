import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterByCreatedOrAPI, filterByType, getAllPokemons,getAllTypes,orderByAlphabet, orderByAttack,cleanCacheAll} from '../components/actions/index'
import Card from '../components/Card'
import Paginado from './Paginado'
import Error404 from "./ErrorMsj";
import style from './Home.module.css';
import Loading from './Loading'


export default function Home() {
  let [, setFiltrados] = useState();
    const dispatch = useDispatch()

let pokemon = useSelector(state => state.pokemon);

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

useEffect(()=>{
  dispatch(getAllPokemons())
  dispatch(getAllTypes())},[dispatch]
  )



function  handlefilterType(e){
    
  dispatch(filterByType(e.target.value));
  if (e.target.value!=='Filtrar por tipo')
  {
   e.preventDefault();
   document.getElementById('FilterOrigin').selectedIndex=0;
   document.getElementById('Alfabetic').selectedIndex=0;
   document.getElementById('OrderAttack').selectedIndex=0;
    setCurrentPage(1);
    setFiltrados(`filtrado por Tipo ${e.target.value}`);
 
  }
}
function handelCreatedOrExisted(e){
 if (e.target.value!=='Filtrar por origen')
 {
  e.preventDefault();
  document.getElementById('FilterType').selectedIndex=0;
  document.getElementById('Alfabetic').selectedIndex=0;
  document.getElementById('OrderAttack').selectedIndex=0;

   dispatch(filterByCreatedOrAPI(e.target.value));
    setCurrentPage(1);
  setFiltrados(`filtrado por origen ${e.target.value}`);
 
  
 }
  
 
}
 
function handleOrderByName(e){
  if (e.target.value!=='Alfabéticamente')

  {
   e.preventDefault();
  //  document.getElementById('FilterType').selectedIndex=0;
  //  document.getElementById('FilterOrigin').selectedIndex=0;
  document.getElementById('OrderAttack').selectedIndex=0;

  dispatch(orderByAlphabet(e.target.value));
   setCurrentPage(1);
  setFiltrados(`Ordenado Alfabetico ${e.target.value}`)//me sirve para que modifique el estado local y se renderice
 
 
}
}
function handleOrderByAttack(e){
  if (e.target.value!=='Orden por Ataque')
  {
   e.preventDefault();
  //  document.getElementById('FilterType').selectedIndex=0;
  document.getElementById('Alfabetic').selectedIndex=0;
  //  document.getElementById('FilterOrigin').selectedIndex=0;
  dispatch(orderByAttack(e.target.value));
  setCurrentPage(1);
  setFiltrados(`Ordenado Ataque ${e.target.value}`) //me sirve para que modifique el estado local y se renderice
  }
}
function handleClick(e){
  e.preventDefault();
  dispatch(cleanCacheAll());
  dispatch(getAllPokemons());
  document.getElementById('FilterType').selectedIndex=0;
  document.getElementById('Alfabetic').selectedIndex=0;
  document.getElementById('FilterOrigin').selectedIndex=0;
  document.getElementById('OrderAttack').selectedIndex=0;
    }

return(
  pokemon.error ?
    <Error404 /> :
     allPokemons.length===0 ?
     <Loading/>
     :
   <div>  
    
      <div className={style.contenedorFiltros}>

        <select id="FilterType" defaultValue="Filtrar por tipo" onChange={e => handlefilterType(e)}>
          <option disabled value ='Filtrar por tipo'>Filtrar por tipo:</option>
          <option value="all">Todos</option>
          {
            alltypes?.map(t => {
              return (
                <option value={t.name} key={t.id}>{t.name}</option>
              )
            })
          }
          </select>
        <select id="FilterOrigin" defaultValue="Filtrar por origen" onChange={e=>handelCreatedOrExisted(e)}>
        <option disabled value='Filtrar por origen' >Filtrar por origen:</option> 
              <option value="all">Todos</option>
          <option value="Created">Creados</option>
          <option value="Existed">Existentes</option>
        </select>
        <select  id="Alfabetic" defaultValue='Alfabéticamente' onChange={e => handleOrderByName(e)}>
            <option disabled value='Alfabéticamente'>Alfabéticamente:</option>
            <option value="asc">Aa-Zz</option>
            <option value="desc">Zz-Aa</option>
          </select>


        <select  id="OrderAttack" defaultValue='Orden por Ataque' onChange={e => handleOrderByAttack(e)}>
          <option disabled value='Orden por Ataque'>Orden por Ataque:</option>
          <option value="asc">Menor a mayor ataque </option>
          <option value="desc">Mayor a menor ataque </option>
        </select>

        <button className={style.buttonReset} onClick={e=>handleClick(e)}>
          Volver a cargar
      </button>
      </div>

        <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
                currentPage={currentPage}
           />
           
     <div className={style.contenedorPokemon}>       
 
        {currentPokemons?.map((e) => {
              return (
                <div key={e.id}>                
                 
                    <Card 
                    idPokemon={e.id} 
                    name={e.name} 
                    image={e.image} 
                    types={e.createdInDB ? e.types?.map(t => t.name) : e.types} />           
                </div>
            )
            })
                }
     </div>
     <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
                currentPage={currentPage}
           />
    </div>
)
 }