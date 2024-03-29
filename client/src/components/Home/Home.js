import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons,  getAllTypes,} from '../../Redux/actions/index'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import Error404 from "../ErrorMsj/ErrorMsj";
import style from './Home.module.css';
import Loading from '../Loading/Loading'
import Filters from '../Filters/Filters'


export default function Home() {

let [, setFiltrados] = useState();
    const dispatch = useDispatch()

let pokemon = useSelector(state => state.pokemon);

const allPokemons =useSelector(state=>state.pokemons)

const alltypes=useSelector(state =>state.types)

console.log(alltypes )

//estados para el paginado 
const[currentPage,setCurrentPage]=useState(1)  // mi pagina actual que arranca en 1
const[pokemonsPerPage,/*setPokemonsPerPague*/]= useState(12) ;   // pokemons por pagina siempre seran 12
const indexOfLastPokemons=currentPage * pokemonsPerPage //12
const indexOfFirstPokemons= indexOfLastPokemons - pokemonsPerPage //0
const currentPokemons=allPokemons.slice(indexOfFirstPokemons,indexOfLastPokemons)// me da los pokemons  para mi pagina actual

const paginado = (pageNumber)=>{  // me va a servit para el renderizado
  setCurrentPage(pageNumber)
//   setPokemonsPerPague(pageNumber===1? 9 : 10)
}

const filtrado =(description)=>{  // me va a servit para el renderizado
  setFiltrados(description)
}

useEffect(()=>{
  dispatch(getAllPokemons())
  dispatch(getAllTypes())},[dispatch]
  )

return(
  pokemon.error ?
    <Error404 /> :
     allPokemons.length<1 ?
     <Loading/>
     :
   <div>  
    <Filters
      paginado={paginado}
      filtrado={filtrado}
    />
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