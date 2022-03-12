import fs from "fs";

const dbPath = './data/db.json';

export const getAPokemon = (req,res)=>{
    const pokemons_data = JSON.parse(fs.readFileSync(dbPath));
    let pokmn;
    for(let i of pokemons_data){
        if(i.id === req.params.id) pokmn = i;
    }
    res.send(pokmn);
}