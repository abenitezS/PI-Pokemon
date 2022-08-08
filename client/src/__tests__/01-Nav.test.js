import React from "react";
import {NavLink, Route, } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<NavBar />); })

 it('Debería ser un componente de funcion />. ', () => {
    expect(isReact.classComponent(nav)).toBeFalsy();
  });

  it('Debería renderizar <NavLink to="" />. ', () => {
    
    expect(nav.find(NavLink).length).toBeGreaterThanOrEqual(1);
  });

  it('Debería tener un Navlink  que cambie la ruta hacia "/pokemons"', () => {
   
    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/pokemons");
   
  });

  it('Debería renderizar <SearchBar/>', () => {
    
    expect(nav.find(SearchBar).length).toBe(1);
 
  });
  
  it('El componente "SearchBar" se debería renderizar solamente en la ruta "/home""', () => {
    expect(nav.find(Route).prop("path")).toEqual("/home");
    expect(nav.find(Route).length).toBe(1)
    expect(nav.find(Route).prop("exact")).toBeTruthy();
  });
});
