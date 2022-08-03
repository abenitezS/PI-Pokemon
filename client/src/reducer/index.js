import {
    GET_ALL_POKEMONS,  
    GET_POKEMON_BY_ID,   
    GET_POKEMON_BY_NAME,   
    GET_ALL_TYPES,    
    CREATE_POKEMON,    
    CLEAN_CACHE,    
    ORDER_ALPHABET,
    ORDER_ATTACK,
    CLEAN_CACHE_ALL,     
    FILTER_TYPE, 
    FILTER_CREATED_API,
    DELETE_POKEMON
     } from "../components/actions/index.js"

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
        if (action.payload.msj) {
            let error = {error: "No se encontró el pokémon"}
            console.log(error)
            return {
                ...state,
                pokemon: error,
              
            }
        }
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
        
      
        case CLEAN_CACHE: return {
            ...state,
            pokemon: [],
           
        }
        case CLEAN_CACHE_ALL: return {
            ...state,
            pokemons: [],
           
        }
        case ORDER_ALPHABET:
            let pokesAlpha=state.pokemonsall;
            if (action.payload === "asc") {
                pokesAlpha = pokesAlpha.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                });
            } else {
                pokesAlpha = pokesAlpha.sort((a, b) => {
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
            case ORDER_ATTACK:
                let pokesAttack=state.pokemonsall;
                if (action.payload === "asc") {
                    pokesAttack = pokesAttack.sort((a, b) => {
                        if (a.attack > b.attack) return 1;
                        if (b.attack > a.attack) return -1;
                        return 0;
                    });
                } else {
                    pokesAttack = pokesAttack.sort((a, b) => {
                        if (a.attack > b.attack) return -1;
                        if (b.attack > a.attack) return 1;
                        return 0;
                    });
                }
                // console.log(pokesAttack)
                return {
                    ...state,
                    pokemons: pokesAttack,
                    
                }



        case FILTER_TYPE:
        
            let pokesType = state.pokemonsall.filter(p => {
                if (p.createdInDB) { if ( p.types.includes(t=> t.name === action.payload) )return p}         
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
    case FILTER_CREATED_API:
        if (action.payload === "default") {
            return {
                ...state,
                pokemons: state.pokemonsall,
               
            }
        }
        let pokesOrigen=[]
        if (action.payload==='Created') {
             pokesOrigen= state.pokemonsall.filter(p=> p.createdInDB)
        }
        else {
             pokesOrigen =state.pokemonsall.filter(p=>!p.hasOwnProperty("createdInDB"))
        }
        //console.log(pokesOrigen);
        if (pokesOrigen.length === 0) {
            alert(`No hay pokémons de tipo ${action.payload}`);
            return {
                ...state,
                
            }
        }
        return {
            ...state,
            pokemons: pokesOrigen,
        }
        case DELETE_POKEMON: return {
            ...state,
           
        }
            
     default: return state
    }

}

export default rootReducer