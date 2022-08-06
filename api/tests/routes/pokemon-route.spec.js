
const request = require('supertest');
const app = require('../../src/app.js');
const {  conn } = require('../../src/db.js');


describe('Crear Pokemon', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  })

    describe('POST /Pokemons', () => {
      it('should return status 500 and corresponding text if Pokemon  was not created', async () => {
        const res = await request(app)
                          .post('/pokemons')
                          .send({name:'78Agg',attack:55});
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain("Error al crear el Pokemon ");
      });
  
      it('should return status 201 and pokemon object if pokemon was succesfully created', async () => {
        const res = await request(app)
                            .post('/pokemons')
                            .send({id: "c1b68c29-bef4-48a0-822c-634efa305ac5",name:'Fireballu'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({
            createdInDB: true,
            name: "fireballu",
            hp: null,
            attack: null,
            defense: null,
            speed: null,
            height: null,
            weight: null,
            image: "https://img.icons8.com/clouds/500/pokemon-go.png"
          
        }));
      });
     afterAll(async() => {
    conn.close(); 
    })

  })

 
 
  })

