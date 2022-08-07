import React from 'react'
import style from './Paginado.module.css'
export default function Paginado({pokemonsPerPage, allPokemons, paginado,currentPage}){
    const pageNumbers=[]
    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1); // cargo las paginas en un array
    }
    return (
        <div className={style.contenedorPaginado}>
            <ul className={style.pag_ul} >
                {pageNumbers && 
                pageNumbers.map(number=> (
                    <ul className={style.pag_a} key={number}>
                        <button type="Submit" 
                        className={currentPage === number ? style.btnActive : 
                        style.btnPagination} onClick={()=>paginado(number)}>{number}</button>
                    </ul>
                ))}
            </ul>
        </div>
    )

}