import fs from "fs";

const dbPath = './data/db.json';

export const getRandomPokemon = (req,res)=>{
    const pokemons_array = JSON.parse(fs.readFileSync(dbPath));
    res.send(pokemons_array[Math.floor(Math.random() * pokemons_array.length)]);
}