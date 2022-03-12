import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const dbPath = './data/db.json';

export const addPokemon = (req,res)=>{
    const poke_id = uuidv4();
    let poke_data = req.body;
    poke_data = {...poke_data,id: poke_id};
    const db_data = JSON.parse(fs.readFileSync(dbPath));
    db_data[db_data.length] = poke_data;
    fs.writeFileSync(dbPath,JSON.stringify(db_data,null,4));
    res.send("Pokemon Added")
}