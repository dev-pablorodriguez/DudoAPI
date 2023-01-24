const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();
const WebSocketServer = require('ws');

//DB
dbConnection();

//=================create express server==================
const httpPort = process.env.HTTP_PORT;

const app = express();

//Cors
app.use(cors());

//Parse requests json body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

//Listen requests
app.listen(httpPort, () => {
    console.log(`Server running on port ${ httpPort }`);
})
//========================================================

//WebSocket Server
const wsPort = process.env.WS_PORT;
const wss = new WebSocketServer.Server({ port: wsPort });

wss.on('connection', ws => {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('Connection established!');
});
