import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../db.json";
import CreatePokemon from "../components/CreatePokemon/CreatePokemon";
import * as actions from "../redux/actions";
import { createPokemon } from "../src/components/actions";

configure({ adapter: new Adapter() });

xdescribe("<CreatePokemon />", () => {
  const state = { houses: data.houses };
  const mockStore = configureStore([thunk]);
  const { CREATE_HOUSE } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateHouse)).toBeFalsy());

  
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  xdescribe("Estructura", () => {
    let createHouse;
    let store = mockStore(state);
    beforeEach(() => {
      createHouse = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters/create"]}>
            <CreateHouse />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createHouse.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Nombre: "', () => {
      expect(createHouse.find("label").at(0).text()).toEqual("Nombre: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createHouse.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "HP: "', () => {
      expect(createHouse.find("label").at(1).text()).toEqual("HP: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "hp"', () => {
      expect(createHouse.find('input[name="hp"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Ataque: "', () => {
      expect(createHouse.find("label").at(2).text()).toEqual("Ataque: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "attack"', () => {
      expect(createHouse.find('input[name="attack"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Defensa: "', () => {
        expect(createHouse.find("label").at(2).text()).toEqual("Defensa: ");
      });
  
    it('Debería renderizar un input con la propiedad "name" igual a "defense"', () => {
        expect(createHouse.find('input[name="defense"]')).toHaveLength(1);
      });
      it('Debería renderizar un label con el texto "Velocidad: "', () => {
        expect(createHouse.find("label").at(2).text()).toEqual("Velocidad: ");
      });
  
    it('Debería renderizar un input con la propiedad "name" igual a "speed"', () => {
        expect(createHouse.find('input[name="speed"]')).toHaveLength(1);
      });
      it('Debería renderizar un label con el texto "Altura: "', () => {
        expect(createHouse.find("label").at(2).text()).toEqual("Altura: ");
      });
  
    it('Debería renderizar un input con la propiedad "name" igual a "height"', () => {
        expect(createHouse.find('input[name="height"]')).toHaveLength(1);
      });
      it('Debería renderizar un label con el texto "Peso: "', () => {
        expect(createHouse.find("label").at(2).text()).toEqual("Peso: ");
      });
  
    it('Debería renderizar un input con la propiedad "name" igual a "weight"', () => {
        expect(createHouse.find('input[name="weight"]')).toHaveLength(1);
      });
    
    
    it('Debería renderizar un label con el texto "URL de imagen: "', () => {
        expect(createHouse.find("label").at(2).text()).toEqual("URL de imagen: ");
      });
     it('Debería renderizar un input con la propiedad "name" igual a "image"', () => {
        expect(createHouse.find('input[name="image"]')).toHaveLength(1);
      });
  




    it('Debería renderizar un button con "type" igual a "submit" y con texto "Crear"', () => {
      expect(createHouse.find('button[type="submit"]')).toHaveLength(1);
      expect(createHouse.find("button").at(0).text()).toEqual("Crear");
    });
  });

  xdescribe("Manejo de estados", () => {
    let useState, useStateSpy, createHouse;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createPokemon = mount(
        <Provider store={store}>
          <CreatePokemon />
        </Provider>
      );
    });

    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        type: []
      });
    });

//     xdescribe("Name input", () => {
//       it('Debería cambiar de estado cuando cambie el valor del input "name', () => {
//         createHouse.find('input[name="name"]').simulate("change", {
//           target: { name: "name", value: "House Baratheon" },
//         });
//         expect(useState).toHaveBeenCalledWith({
//           name: "House Baratheon",
//           region: "",
//           words: "",
//         });
//       });
//     });

//     xdescribe("Region input", () => {
//       it('Debería cambiar de estado cuando cambie el valor del input "region', () => {
//         createHouse.find('input[name="region"]').simulate("change", {
//           target: { name: "region", value: "Stormlands" },
//         });
//         expect(useState).toHaveBeenCalledWith({
//           name: "",
//           region: "Stormlands",
//           words: "",
//         });
//       });
//     });

//     xdescribe("Words input", () => {
//       it('Debería cambiar de estado cuando cambie el valor del input "words', () => {
//         createHouse.find('input[name="words"]').simulate("change", {
//           target: { name: "words", value: "Ours is the Fury" },
//         });
//         expect(useState).toHaveBeenCalledWith({
//           name: "",
//           region: "",
//           words: "Ours is the Fury",
//         });
//       });
//     });
//   });

//   xdescribe("Dispatch to store", () => {
//     let createHouse, useState, useStateSpy;
//     let store = mockStore(state);

//     beforeEach(() => {
//       useState = jest.fn();
//       useStateSpy = jest.spyOn(React, "useState");
//       useStateSpy.mockImplementation((values) => [values, useState]);
//       store = mockStore(state, actions.createHouseAction);
//       store.clearActions();
//       createHouse = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={["/characters/create"]}>
//             <CreateHouse />
//           </MemoryRouter>
//         </Provider>
//       );
//     });

//     afterEach(() => jest.restoreAllMocks());

//     it('Debería hacer un dispatch al store utilizando la action "createHouse" con los datos del state cuando se hace un "submit"', () => {
//       // Acá deberías usar el hook de Redux "useDispatch" también!
//       const createHouseFn = jest.spyOn(actions, "createHouse");
//       createHouse
//         .find('[type="submit"]')
//         .simulate("submit", { preventDefault() {} });
//       const expectedAction = [
//         {
//           payload: {
//             name: "",
//             region: "",
//             words: "",
//             id: 4,
//           },
//           type: CREATE_HOUSE,
//         },
//       ];
//       expect(store.getActions()).toEqual(expectedAction);
//       expect(CreateHouse.toString().includes("useDispatch")).toBeTruthy();
//       expect(createHouseFn).toHaveBeenCalled();
//     });

//     it('Debería llamar al evento "preventDefault" para evitar que se refresque la página luego de hacer un submit', () => {
//       const event = { preventDefault: () => {} };
//       jest.spyOn(event, "preventDefault");
//       createHouse.find("form").simulate("submit", event);
//       expect(event.preventDefault).toBeCalled();
//     });
  });
});
