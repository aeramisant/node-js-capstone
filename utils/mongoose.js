require('dotenv').config();

const password = process.env.MONGODB_PASSWORD;
const userName = process.env.MONGODB_USERNAME;
const dbName = process.env.MONGODB_DBNAME;
const uri = `mongodb+srv://${userName}:${password}@node-js.aexjgn6.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;

module.exports = uri;
