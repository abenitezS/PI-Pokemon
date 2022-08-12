import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import titulo from '../../img/logo_navbar.jpg'
import { Switch, Route, NavLink } from 'react-router-dom'
import style from './NavBar.module.css'

export default function NavBar() {
 
    return (
        <div className={style.contenedorNavbar}>
            <NavLink to="/pokemons">
                <img className={style.image} src={titulo} alt="titulo" />
            </NavLink>
            <Switch>
                <Route exact path={"/home"}>
                    <SearchBar />
                </Route>
            </Switch>
        </div>
    )
    }
