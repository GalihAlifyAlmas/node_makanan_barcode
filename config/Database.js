import { Sequelize } from "sequelize";

const db = new Sequelize('node_crudd','root','',{
    host:'localhost', 
    dialect:'mysql'
});

export default db;