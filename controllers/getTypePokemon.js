import fs from "fs";

const dbPath = './data/db.json';

export const getTypePokemon = (req,res)=>{
    const pokemons_data = JSON.parse(fs.readFileSync(dbPath));
    let pokemons_array = [];
    for(let i of pokemons_data){
        pokemons_array.push(i);
    }
    const arr = pokemons_array.filter((poke)=>{
        return poke.type.toLowerCase() === req.params.type.toLowerCase();
    });
     
    // res.write(`all ${req.params.type} type pokemons`);
    res.send(arr);
}