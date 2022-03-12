import express from "express";

import { getAllPokemons } from './../../controllers/getAllPokemons.js';
import { getAPokemon } from './../../controllers/getAPokemon.js';
import { getRandomPokemon } from './../../controllers/getRandomPokemon.js';
import { getTypePokemon } from './../../controllers/getTypePokemon.js';
import { addPokemon } from './../../controllers/addPokemon.js';
import { changePokemon } from './../../controllers/changePokemon.js';
import { updatePokemonData } from './../../controllers/updatePokemonData.js';
import { deletePokemon } from './../../controllers/deletePokemon.js';

const router = express.Router();


router.get('/',(req,res)=>{
    res.send("Hello, This is a simple Pokemon API using local JSON file as a database");
});

router.get('/getAll',getAllPokemons);

router.get('/get/:id',getAPokemon)

router.post("/add",addPokemon)

router.get('/getRandom',getRandomPokemon);

router.get('/getType/:type',getTypePokemon);


router.delete('/delete/:id',deletePokemon);

router.patch('/update/:id',updatePokemonData);

router.put('/change/:id',changePokemon);


export default router;