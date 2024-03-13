require('dotenv').config();

const password = process.env.MONGODB_PASSWORD;
const userName = process.env.MONGODB_USERNAME;
const dataBase = process.env.MONGODB_DATABASE;
const dbName = process.env.MONGODB_DBNAME;
const uri = `mongodb+srv://${userName}:${password}@node-js.aexjgn6.mongodb.net/${dataBase}?retryWrites=true&w=majority&appName=${dbName}`;

module.exports = uri;
