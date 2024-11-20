import { createApp } from 'vue';
import { io } from "socket.io-client";

import HomeApp from '../views/Home.vue';
import VueSocketIOExt from 'vue-socket.io-extended';

const socket = io("http://localhost:9000", {
    path: '/webhook',
    reconnection: true,
    rejectUnauthorized: false,
    transports: [ "websocket", "polling"],
});

console.log(socket)

export default function loadApp(el, pinia, router) {
    const app = createApp(HomeApp).use(pinia).use(router).use(VueSocketIOExt, socket).mount(el);
}