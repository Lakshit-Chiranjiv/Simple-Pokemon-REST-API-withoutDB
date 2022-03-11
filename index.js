import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const PORT = 8000;
const app = express();

app.use(bodyParser.json());

let pokemons_array = [];

app.get('/',(req,res)=>{
    res.send("Hello from server");
});

app.get('/pokemons',(req,res)=>{
    res.send(pokemons_array);
});

app.post("/addpokemon",async(req,res)=>{
    const poke_id = uuidv4();
    let poke_data = req.body;
    poke_data = {...poke_data,id: poke_id};
    await pokemons_array.push(poke_data);
    res.send("Pokemon Added")
})

app.listen(PORT,()=>{console.log("Server running at port "+PORT)});