import React from 'react'
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getPokemonByName} from '../../Redux/actions'
import { Redirect,useHistory} from "react-router-dom";
import style from './SearchBar.module.css'
import {FcSearch} from 'react-icons/fc'


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

      <div className={style.contenedorButtonCrear}>
        <button onClick={() => history.push("/about")} className={style.buttonCrear}>About</button>
      </div>

      <div className={style.contenedorButtonCrear}>
        <button onClick={() => history.push("/pokemon")} className={style.buttonCrear}>Crear Pokémon</button>
      </div>

      <form className={style.contenedorForm} onSubmit={(e) => handleSubmit(e)}>
        
         
          <div className={style.inputSearch}>
             <FcSearch />
           <input 
             type="text"
             placeholder="Buscar..."
            onChange={e=>handleInputChange(e)}
             />
        </div>
        
         
          <button disabled={name.length === 0} type="submit" className={style.buttonSearch}>Buscar</button>

      </form>

      

      { pokemon.error? <Redirect to={`/home/${pokemon.error}`} /> : pokemon.id &&  <Redirect to={`/home/${pokemon.id}`} />}
      {/* { pokemon.id &&  <Redirect to={`/home/${pokemon.id}`} />}  */}

    </div>
  );
}