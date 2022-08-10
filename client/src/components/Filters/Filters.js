import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterByCreatedOrAPI, filterByType, getAllPokemons,
 orderByAlphabet, orderByAttack,cleanCacheAll} from '../../Redux/actions/index'
import style from './Filters.module.css'


export default function Filters({paginado,filtrado}){

const dispatch = useDispatch();

const alltypes=useSelector(state =>state.types)


function  handlefilterType(e){   
  dispatch(filterByType(e.target.value));
  if (e.target.value!=='Filtrar por tipo')
  {
   e.preventDefault();
  // document.getElementById('FilterOrigin').selectedIndex=0;
  document.getElementById('Alfabetic').selectedIndex=0;
   document.getElementById('OrderAttack').selectedIndex=0;
  paginado(1)
   filtrado(`filtrado por Tipo ${e.target.value}`);
   
 
  }
}
function handelCreatedOrExisted(e){
 if (e.target.value!=='Filtrar por origen')
 {
  e.preventDefault();
 //document.getElementById('FilterType').selectedIndex=0;
  document.getElementById('Alfabetic').selectedIndex=0;
 document.getElementById('OrderAttack').selectedIndex=0;

   dispatch(filterByCreatedOrAPI(e.target.value));
   paginado(1)
  filtrado(`filtrado por origen ${e.target.value}`);
 } 
 
}
 
function handleOrderByName(e){
  if (e.target.value!=='Alfabéticamente')
  { 
  document.getElementById('OrderAttack').selectedIndex=0;
  dispatch(orderByAlphabet(e.target.value));
  paginado(1)
  filtrado(`Ordenado Alfabetico ${e.target.value}`)
  
}
}
function handleOrderByAttack(e){
  if (e.target.value!=='Orden por Ataque')
  {
   e.preventDefault();
  
  document.getElementById('Alfabetic').selectedIndex=0;
  dispatch(orderByAttack(e.target.value)); 
  paginado(1)
  filtrado(`Ordenado Ataque ${e.target.value}`) //me sirve para que modifique el estado local y se renderice

  }
}
function handleClick(e){
  e.preventDefault();
  dispatch(cleanCacheAll());
  dispatch(getAllPokemons());
  // document.getElementById('FilterType').selectedIndex=0;
  // document.getElementById('Alfabetic').selectedIndex=0;
  // document.getElementById('FilterOrigin').selectedIndex=0;
  // document.getElementById('OrderAttack').selectedIndex=0;
    }


return(
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
)

}


