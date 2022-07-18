import {
    GET_ALL_POKEMONS,    GET_POKEMON_BY_ID,    GET_POKEMON_BY_NAME,    GET_ALL_TYPES,    CREATE_POKEMON,    CLEAN_CACHE,    ORDER_ALPHABET,
     CLEAN_CACHE_ALL,     FILTER_TYPE,    SET_CURRENT_PAGE   } from "../components/actions/index.js"

const initialState = {
    pokemons: [],
    pokemonsall: [],
    pokemon: [],
    types: [],
  
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS: return {
            ...state,
            pokemons: action.payload,
            pokemonsall: action.payload,
           
        }
        case GET_POKEMON_BY_ID: 
            return {
            ...state,
            pokemon: action.payload,
           
        }
        case GET_POKEMON_BY_NAME: 
        if (action.payload.msj) {
            let error = {error: "No se encontró el pokémon"}
            return {
                ...state,
                pokemon: error,
              
            }
        }
        return {
            ...state,
            pokemon: action.payload,
          
        }
        case GET_ALL_TYPES: return {
            ...state,
            types: action.payload
        }
        case CREATE_POKEMON: return {
            ...state,
            pokemons: [...state.pokemons, action.payload],
            pokemonsall: [...state.pokemons, action.payload],
            
        }
        // case DELETE_POKE: return {
        //     ...state,
        //     page: 1
        // }
        case CLEAN_CACHE: return {
            ...state,
            pokemon: [],
           
        }
        case CLEAN_CACHE_ALL: return {
            ...state,
            pokemons: [],
           
        }
        case ORDER_ALPHABET:
            let pokesAlpha;
            if (action.payload === "az") {
                pokesAlpha = state.pokemonsFiltrados.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                });
            } else {
                pokesAlpha = state.pokemonsFiltrados.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
            }
            // console.log(pokesAlpha)
            return {
                ...state,
                pokemons: pokesAlpha,
                
            }
      
        case FILTER_TYPE:
        
            let pokesType = state.pokemonsall.filter(p => {
                if (p.createdInDB) { if ( p.types.filter(t=> t.name === action.payload).length>0) return p}         
                return p.types.includes(action.payload)
                }
            );
            // console.log(pokesType);
            if (pokesType.length === 0) {
                alert(`No hay pokémons de tipo ${action.payload}`);
                return {
                    ...state,
                    
                }
            }
            return {
                ...state,
                pokemons: pokesType,
            }

        default: return state
    }
}

export default rootReducer