import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { updateProductprices, getCurrentProducts, getProductHistory } from './db/queries.js';
import { startProductsFetch } from './fetchProducts.js';
import { socketRouter } from './sockets.js';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        socketRouter(ws, data);
    });
})

startProductsFetch();



