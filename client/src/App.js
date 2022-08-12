import React from 'react';  //me falto eso!!!

import Home from './components/Home/Home.js';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.js';
import CreatePokemon from '../src/components/CreatePokemon/CreatePokemon';
import CardsDetails from './components/CardDetails/CardsDetails';
import NavBar from './components/NaBar/NavBar.js';
import About from './components/About/About.js';
function App() {
  return (
   <BrowserRouter>
   <div> 
    <Switch >
       
      <Route  path="/home/:id">
       
        <CardsDetails/>
      </Route>
      
      <Route  path="/home">  
        <NavBar /> 
        <Home/>
      </Route>

      <Route path='/Pokemon'>    
        <NavBar /> 
        <CreatePokemon/>
      </Route>

      <Route path={'/about'}>
        <NavBar/>
        <About/>
      </Route>

      <Route exact path="/" component={LandingPage}/>

       <Route path="*" component={LandingPage}/>
    </Switch>
      

      
        
    </div>
   </BrowserRouter>     
  );
}
export default App;