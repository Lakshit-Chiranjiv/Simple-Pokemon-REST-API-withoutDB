import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const PORT = 8000;
const app = express();

app.use(bodyParser.json());

let pokemons_array = [
    {
        name: "Pikachu",
        type: "Electric",
        power: 90,
        id: "8aded5cf-bb4d-4a69-82f3-74dde0b74c18"
    },
    {
        name: "Squirtle",
        type: "Water",
        power: 70,
        id: "823efa58-765e-4779-b689-2da6a292299c"
    },
    {
        name: "Charmander",
        type: "Fire",
        power: 70,
        id: "d8f6f51a-da27-4ac7-bed5-86d5cfa57bcc"
    },
    {
        name: "Bulbasaur",
        type: "Grass",
        power: 80,
        id: "bcb32c0c-9a28-4ce5-9867-4ba6ca97da07"
    },
    {
        name: "Gengar",
        type: "Ghost",
        power: 85,
        id: "6ca39967-468a-4517-becf-7d523623be17"
    },
    {
        name: "Onix",
        type: "Rock",
        power: 65,
        id: "c3c4a7d3-c4e6-4421-ae54-0c92ca7bbb7b"
    }
];

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

app.get('/randomPokemon',(req,res)=>{
    res.send(pokemons_array[Math.floor(Math.random() * pokemons_array.length)]);
});

app.get('/typePokemons/:type',(req,res)=>{
    const arr = pokemons_array.filter((poke)=>{
        return poke.type.toLowerCase() === req.params.type.toLowerCase();
    });
     
    // res.write(`all ${req.params.type} type pokemons`);
    res.send(arr);
});

app.listen(PORT,()=>{console.log("Server running at port "+PORT)});