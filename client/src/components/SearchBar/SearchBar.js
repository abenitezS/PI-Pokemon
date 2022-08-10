import React from 'react'
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getPokemonByName} from '../../Redux/actions'
import { Redirect,useHistory} from "react-router-dom";
import style from './SearchBar.module.css'



export default function SearchBar () {
    let [name, setName] = useState("");

    const dispatch = useDispatch();
  
    const history = useHistory();
  
    let pokemon = useSelector(state => state.pokemon);

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value.toLowerCase())
        console.log(name)
    }

    let handleSubmit = (e) => {
      e.preventDefault();
      if (name !== "") return dispatch(getPokemonByName(name));
      else  alert("Debes ingresar el nombre de un pokémon");
      
    }

    

return (
    <div className={style.contenedorSearchbar}>
     

      <form className={style.contenedorButtonSearch} onSubmit={(e) => handleSubmit(e)}>
        <input className={style.inputSearch}
          type="text"
          placeholder="Buscar..."
          onChange={e=>handleInputChange(e)}
        />
          <button disabled={name.length === 0} type="submit" className={style.buttonSearch}>Buscar</button>

      </form>

       <div className={style.contenedorButtonCrear}>
        <button onClick={() => history.push("/pokemon")} className={style.buttonCrear}>Crear Pokémon</button>
      </div>

      { pokemon.error? <Redirect to={`/home/${pokemon.error}`} /> : pokemon.id &&  <Redirect to={`/home/${pokemon.id}`} />}
      {/* { pokemon.id &&  <Redirect to={`/home/${pokemon.id}`} />}  */}

    </div>
  );
}