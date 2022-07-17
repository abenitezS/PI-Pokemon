import React from 'react'
import '../components/paginado.css'
export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers=[]
    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1); // cargo las paginas en un array
    }
    return (
        <nav>
            <ul >
                {pageNumbers && 
                pageNumbers.map(number=> (
                    <li className='paginado' key={number}>
                        <a  className='pag_a' onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )

}