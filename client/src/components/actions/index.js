import axios from "axios"
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_CACHE = "CLEAN_CACHE";
export const CLEAN_CACHE_ALL = "CLEAN_CACHE_ALL";
export const ORDER_ALPHABET = "ORDER_ALPHABET";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_CREATED_API= "FILTER_CREATED_API";
export const ORDER_ATTACK='ORDER_ATTACK'


export function getAllPokemons() {
    return async function(dispatch) {
        try {
          const {data}= await axios.get('http://localhost:3001/pokemons');
        return dispatch({type: GET_ALL_POKEMONS, payload: data
        })   
        } catch (error) {
            console.log('Error en getAllPokemons '+ error)
        }
    }
}

export function getPokemonById(id) {
   return async function (dispatch) {  
    try {
        const {data}= await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({type: GET_POKEMON_BY_ID, payload: data})    
    } 
    catch (error) {
        console.log('Error en getPokemonById '+ error)
    } 
}
}

export function getPokemonByName(name) {
    return async function(dispatch) {
        try {
            const r = await fetch(`http://localhost:3001/pokemons?name=${name}`);
            const data = await r.json();
            return dispatch({ type: GET_POKEMON_BY_NAME, payload: data });
        } catch (e) {
            return console.log(e);
        }
    }
}

export function getAllTypes() {
    
    return async function(dispatch) {
        const {data}= await axios.get(`http://localhost:3001/types`)
        return dispatch({type: GET_ALL_TYPES, payload: data})
        
    }
}

export function createPokemon(values) {
    return async function(dispatch) {
        try {
            const {data} = await axios.post(`http://localhost:3001/pokemons`, values);
            dispatch({type: CREATE_POKEMON, payload: data});
        } catch (error) {
            console.log(error);
        }
    }
};


export const cleanCache = () => {
    return {type: CLEAN_CACHE}
}

export const cleanCacheAll = () => {
    return {type: CLEAN_CACHE_ALL}
}


export const orderByAlphabet = (payload) => {
    return {type: ORDER_ALPHABET, payload}
}

export const orderByAttack = (payload) => {
    return {type: ORDER_ATTACK, payload}
}


export const filterByType = (payload) => {
    return {type: FILTER_TYPE, payload}
}

export const filterByCreatedOrAPI = (payload) => {
    return {type: FILTER_CREATED_API, payload}
}

