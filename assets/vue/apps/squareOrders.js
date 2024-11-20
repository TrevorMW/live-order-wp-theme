import { createApp } from 'vue';
import { io } from "socket.io-client";

import SquareOrders from '../views/SquareOrders.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import Socket from 'vue-socket.io-extended/decorator'

const socket = io("http://localhost:8080", {
    path: '/',
    reconnection: true,
    rejectUnauthorized: false,
    transports: [ "websocket", "polling"],
});

console.log(socket);

export default function loadOrdersApp(el, pinia) {
    const app = createApp(SquareOrders);

    app.use(pinia)
       .use(VueSocketIOExt, socket)
       .mount(el);
}