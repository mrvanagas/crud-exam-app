const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config({path: 'server/.env'});

const server = express();
const {
    SERVER_PORT,
    MONGO_COMPASS_USER,
    MONGO_COMPASS_PASS,
    MONGO_COMPASS_CLUSTER_URL,
    MONGO_COMPASS_CLUSTER_DB
} = process.env;

//middleware
server.use(express.json());
server.use(cors());
server.use(morgan('tiny'));

//server configuration
server.get('/', (req, res) => {
    res.send('server is running')
});

const db = mongoose.connection;
mongoose.connect(`mongodb+srv://${MONGO_COMPASS_USER}:${MONGO_COMPASS_PASS}@${MONGO_COMPASS_CLUSTER_URL}/${MONGO_COMPASS_CLUSTER_DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

db.once('open', () => {
    console.log('connected to db successfully')
    server.listen(SERVER_PORT, ()=>{
        console.log(`server is running on http://localhost:${SERVER_PORT}`);
    });
});

db.on('error', () => console.error('FAILED TO CONNECT TO DB:\n ' + error))