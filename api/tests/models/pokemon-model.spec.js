const { Pokemon, conn } = require('../../src/db.js');

describe('Pokemon Model', () => {
    beforeAll(async () => {
      await conn.sync({ force: true });
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
  
    it('should not create the Pokemon if name countains number', async () => {
      expect.assertions(1);
      try {
        await Pokemon.create({name: 'Fire88 Ball'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should create the Pokemon if all required properties are ok', async () => {
      const pokemon = await Pokemon.create({
        name: 'Franco',
        hp:150
      });
      expect(pokemon.toJSON()).toHaveProperty('name','Franco');
      expect(pokemon.toJSON()).toHaveProperty('hp',150);
      expect(pokemon.toJSON()).toHaveProperty('image',null);
    });
  
    it('should not create two Pokemons with the same name', async () => {
      expect.assertions(2);
      try {
        const PokeOne = await Pokemon.create({name: 'Fire Ball'});
        expect(PokeOne.toJSON()).toHaveProperty('name','Fire Ball');
        
        const PokeTwo = await Pokemon.create({name: 'Fire Ball'});
        expect(PokeTwo.toJSON()).toHaveProperty('name','Fire Ball');
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});