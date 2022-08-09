import React from 'react'
import style from './Paginado.module.css'
export default function Paginado({pokemonsPerPage, allPokemons, paginado,currentPage}){
    const pageNumbers=[]
    const totalPages= Math.ceil(allPokemons/pokemonsPerPage)

    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i+1); // cargo las paginas en un array
    }
    return (
        <nav className={style.contenedorPaginado}>
            <ul className={style.pag_ul} >
                <button disabled={currentPage - 1===0} onClick={()=>paginado(currentPage-1)}> {`<<`}</button>
                {pageNumbers && 
                pageNumbers.map(number=> (
                    <ul className={style.pag_a} key={number}>
                        <button type="Submit" 
                        className={currentPage === number ? style.btnActive : 
                        style.btnPagination} onClick={()=>paginado(number)}>{number}</button>
                    </ul>
                ))}
                <button disabled={currentPage === totalPages } onClick={()=>paginado(currentPage+1)}> {`>>`}</button>
            </ul>
        </nav>
    )

}