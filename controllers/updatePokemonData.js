import fs from "fs";

const dbPath = './data/db.json';

export const updatePokemonData = (req,res)=>{
    const pokemons_data = JSON.parse(fs.readFileSync(dbPath));
    let pokemons_array = [];
    for(let i of pokemons_data){
        pokemons_array.push(i);
    }
    let pokmn;
    const { name, type, power } = req.body;
    const arr = pokemons_array.map((poke)=>{
        if(poke.id === req.params.id){
            pokmn = poke.name;
            if(name) poke.name = name;
            if(type) poke.type = type;
            if(power) poke.power = power;
        }
        return poke;
    });
    fs.writeFileSync(dbPath,JSON.stringify(arr,null,4));
    res.send(`${pokmn} fields updated`);
}