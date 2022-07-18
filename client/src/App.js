import React from 'react';  //me falto eso!!!
import './App.css';
import Home from '../../client/src/components/Home.js';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from '../../client/src/components/LandingPage.js';
import CreateActivity from '../../client/src/components/CreatePokemon';
import CardsDetails from '../src/components/CardsDetails';
function App() {
  return (
   <BrowserRouter>
    <div className='App'>
   
    <Switch>
       
      <Route  path="/home/:id" component={CardsDetails}  />

      <Route exact path="/" component={LandingPage}/>
      
      <Route  path="/home" component={Home}/>  

     </Switch>

    

   
    </div>
    </BrowserRouter>     
  );
}
export default App;