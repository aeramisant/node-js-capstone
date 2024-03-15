import dotenv from 'dotenv';
dotenv.config();
const password = process.env.MONGODB_PASSWORD;
const userName = process.env.MONGODB_USERNAME;
const dataBase = process.env.MONGODB_DATABASE;
const dbName = process.env.MONGODB_DBNAME;
export const uri = `mongodb+srv://${userName}:${password}@node-js.aexjgn6.mongodb.net/${dataBase}?retryWrites=true&w=majority&appName=${dbName}`;
