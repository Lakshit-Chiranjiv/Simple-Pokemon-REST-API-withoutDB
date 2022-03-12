import fs from "fs";

const dbPath = './data/db.json';

export const getAllPokemons = (req,res)=>{
    const db_Data = JSON.parse(fs.readFileSync(dbPath));
    res.send(db_Data);
}