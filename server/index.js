import express from "express";
import bodyParser from "body-parser";

import pokemonRoutes from './routes/pokemon_routes.js';

const PORT = 8000;
const app = express();

app.use(bodyParser.json());

app.use('/pokemon',pokemonRoutes);


app.listen(PORT,()=>{console.log("Server running at port "+PORT)});