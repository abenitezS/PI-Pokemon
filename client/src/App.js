import React from 'react';  //me falto eso!!!

import Home from '../../client/src/components/Home.js';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from '../../client/src/components/LandingPage.js';
import CreatePokemon from '../../client/src/components/CreatePokemon';
import CardsDetails from '../src/components/CardsDetails';
import NavBar from './components/NavBar.js';
function App() {
  return (
   <BrowserRouter>
   <div> 
    <Switch >
      
      <Route  path="/home/:id">
        <NavBar /> 
        <CardsDetails/>
      </Route>

      <Route exact path="/" component={LandingPage}/>
      
      <Route  path="/home">  
        <NavBar /> 
        <Home/>
      </Route>

      <Route path='/Pokemon'>    
        <NavBar /> 
        <CreatePokemon/>
      </Route>

      <Route path="*" component={LandingPage}/>
  
    </Switch>

    </div>
   </BrowserRouter>     
  );
}
export default App;