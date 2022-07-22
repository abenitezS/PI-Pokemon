const { Pokemon, conn ,db} = require('../../src/db.js');
const { expect } = require('chai');

// describe('Pokemon model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Pokemon.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Pokemon.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Pokemon.create({ name: 'Pikachu' });
//       });
//     });
//   });
// });




describe('Pokemon Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe('Propertys', () => {
    it('should not create the Pokemon if name is not send', async () => {
      expect.assertions(1);
      try {
        await Pokemon.create({hp: 15});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should not create the Pokemon if name is not send', async () => {
      expect.assertions(1);
      try {
        await Pokemon.create({name: 'Fire Ball'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should create the Pokemon if all required properties are ok', async () => {
      const pokemon = await Pokemon.create({
        name: 'Franco',
        mana_cost: 150.0
      });
      expect(pokemon.toJSON()).toHaveProperty('name','Franco');
      expect(pokemon.toJSON()).toHaveProperty('hp',150);
      expect(pokemon.toJSON()).toHaveProperty('description',null);
    });
  
    it('should not create two Pokemons with the same name', async () => {
      expect.assertions(5);
      try {
        const abilityOne = await Pokemon.create({name: 'Fire Ball', mana_cost: 150.0});
        expect(abilityOne.toJSON()).toHaveProperty('name','Fire Ball');
        expect(abilityOne.toJSON()).toHaveProperty('mana_cost',150.0);
        const abilityTwo = await Pokemon.create({name: 'Fire Ball', mana_cost: 100.0});
        expect(abilityTwo.toJSON()).toHaveProperty('name','Fire Ball');
        expect(abilityTwo.toJSON()).toHaveProperty('mana_cost',100.0);
        await Pokemon.create({name: 'Fire Ball', mana_cost: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  describe('Parte DOS', () => {
 
  
    it('should not create the Pokemon if mana_cost is lower than the min value', async () => {
      expect.assertions(1);
      try {
        await Pokemon.create({name: 'Weak power', mana_cost: 5.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should not create the Pokemon if mana_cost is higher than the max value', async () => {
      expect.assertions(1);
      try {
        await Pokemon.create({name: 'Op power', mana_cost: 505.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  })
});