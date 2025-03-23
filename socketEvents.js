import {saveRequest, fetchNearestCops, updateRequest} from "./db/dbOperation.js";
import mongoose from "mongoose";
import { Server } from "socket.io";

const initialize = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (data) => {
      socket.join(data.userId);

      console.log(`User with ID: ${data.userId} joined the room`);
    });

    socket.on("request-for-help", async (eventData) => {
      const requestTime = new Date();
      const requestId =  new mongoose.Types.ObjectId();

      console.log("Request for help received from civilian: ", requestId);

      const location = {
        coordinates: [
          eventData.location.longitude,
          eventData.location.latitude,
        ],

        address: eventData.location.address,
      };

      console.log(location)

      await saveRequest(
        requestId,
        requestTime,
        location,
        eventData.civilianId,
        "waiting"
      );

      // 2. AFTER saving, fetch nearby cops from civilian’s location
        const nearestCops = await fetchNearestCops(
            location.coordinates,
            2000
        );
        eventData.requestId = requestId;

        console.log ("Nearest cops: ", nearestCops);


        // 3. After fetching nearest cops, fire a 'request-for-help' event to each of them
        for (let i = 0; i < nearestCops.length; i++) {
           io.sockets.in(nearestCops[i].userId).emit("request-for-help", eventData);
        }

        socket.on('request-accepted', async (eventData) => { //Listen to a 'request-accepted' event from connected cops
            console.log('eventData contains', eventData);
            //Convert string to MongoDb's ObjectId data-type
            const requestId = mongoose.Types.ObjectId(eventData.requestDetails.requestId);
        
            //Then update the request in the database with the cop details for given requestId
            await updateRequest(requestId, eventData.copDetails.copId, 'engaged');
        
            //After updating the request, emit a 'request-accepted' event to the civilian and send cop details
            io.sockets.in(eventData.requestDetails.civilianId).emit('request-accepted', eventData.copDetails);
        });
        

    });
  });
};

export default initialize;
