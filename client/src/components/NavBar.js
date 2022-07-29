import React, { Component } from 'react'
import SearchBar from './SearchBar'
import titulo from '../img/tituloPokemon.png'
import { Switch, Route, NavLink } from 'react-router-dom'
import style from './NavBar.module.css'


export default class NavBar extends Component {
  render() {
    return (
        <div className={style.contenedorNavbar}>
            <NavLink to="/pokemons">
                <img src={titulo} alt="titulo" className='tituloNavbar'/>
            </NavLink>
            <Switch>
                <Route exact path={"/home"}>
                    <SearchBar />
                </Route>
            </Switch>
        </div>
    )
  }
}