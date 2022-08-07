import React from "react";
import { Link, Route } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import NavBar from "../src/components/NavBar";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let nav;
 
  beforeEach(() => {
    nav = shallow(<NavBar />);
    expect(isReact.classComponent(nav)).toBeFalsy();
  
  });

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/house/create"', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(nav.find(NavLink).length).toBeGreaterThanOrEqual(1);
  });

  it('Debería tener un Route con el texto "Home" que cambie la ruta hacia "/"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Route).at(0).prop("to")).toEqual("/");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Create House" y que cambie la ruta hacia "/house/create"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/house/create");
    expect(nav.find(Link).at(1).text()).toEqual("Create House");
  });
});
