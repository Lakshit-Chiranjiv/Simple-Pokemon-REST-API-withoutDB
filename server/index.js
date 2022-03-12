import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const PORT = 8000;
const app = express();

app.use(bodyParser.json());

const dbPath = './data/db.json';

app.get('/',(req,res)=>{
    res.send("Hello from server");
});

app.get('/pokemons',async(req,res)=>{
    const db_Data = JSON.parse(fs.readFileSync(dbPath));
    res.send(db_Data);
});

app.post("/addpokemon",async(req,res)=>{
    const poke_id = uuidv4();
    let poke_data = req.body;
    poke_data = {...poke_data,id: poke_id};
    const db_data = JSON.parse(fs.readFileSync(dbPath));
    db_data[db_data.length] = poke_data;
    fs.writeFileSync(dbPath,JSON.stringify(db_data,null,4));
    res.send("Pokemon Added")
})

app.get('/randomPokemon',(req,res)=>{
    const pokemons_array = JSON.parse(fs.readFileSync(dbPath));
    res.send(pokemons_array[Math.floor(Math.random() * pokemons_array.length)]);
});

app.get('/typePokemons/:type',(req,res)=>{
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
});


app.delete('/pokemon/delete/:id',(req,res)=>{
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
});

app.patch('/pokemon/update/:id',(req,res)=>{
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
});

app.put('/pokemon/change/:id',(req,res)=>{
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
            poke.name = name;
            poke.type = type;
            poke.power = power;
        }
        return poke;
    });
    fs.writeFileSync(dbPath,JSON.stringify(arr,null,4));
    res.send(`${pokmn} fields are now changed completely`);
});

app.listen(PORT,()=>{console.log("Server running at port "+PORT)});