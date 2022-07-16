const { Router } = require('express');
const pokemons= require("../controllers/pokemons");
const types=require('../controllers/types')

const router = Router();

router.use("/pokemons", pokemons);
router.use("/types", types);


module.exports = router;