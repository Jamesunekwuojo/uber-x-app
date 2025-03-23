import "./db/dbOperation.js";
import mongoose from "mongoose";
import {Server} from "socket.io";

const initialize =(server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('join', (data) => {
            socket.join(data.userId);

            console.log(`User with ID: ${data.userId} joined the room`);
           
        });
    });
}

export default initialize;