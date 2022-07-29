import React from 'react';  //me falto eso!!!
import styles from './App.modules.css';
import Home from '../../client/src/components/Home.js';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from '../../client/src/components/LandingPage.js';
import CreatePokemon from '../../client/src/components/CreatePokemon';
import CardsDetails from '../src/components/CardsDetails';
function App() {
  return (
   <BrowserRouter>
   <div>
   
    <Switch >
      
      <Route  path="/home/:id" component={CardsDetails}  />

      <Route exact path="/" component={LandingPage}/>
      
      <Route  path="/home" component={Home}/>  

      <Route path='/Pokemon' component={CreatePokemon} />    
      
     </Switch>

    </div>
    
    </BrowserRouter>     
  );
}
export default App;