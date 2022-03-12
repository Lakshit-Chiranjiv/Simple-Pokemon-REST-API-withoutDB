import fs from "fs";

const dbPath = './data/db.json';

export const deletePokemon = (req,res)=>{
    const pokemons_data = JSON.parse(fs.readFileSync(dbPath));
    let pokemons_array = [];
    for(let i of pokemons_data){
        pokemons_array.push(i);
    }
    let pokmn;
    const arr = pokemons_array.filter((poke)=>{
        if(poke.id === req.params.id) pokmn = poke.name;
        return poke.id !== req.params.id;
    });
    fs.writeFileSync(dbPath,JSON.stringify(arr,null,4));
    res.send(`${pokmn} deleted`);
}