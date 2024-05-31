var express = require('express');
var app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});
//const axios = require('axios');
////const domainNamespaces = {};

//const workspaces = socketIo.of(/^\/\w+$/);

//workspaces.on("connection", socket => {
  //const workspace = socket.nsp;
 // console.log(workspace);

//});





socketIo.on("connection", (socket) => {


   // socket.on('setNamespace', (namespaceName) => {
        //console.log(`Client requested namespace: ${namespaceName}`);
        
        // Create or retrieve the namespace dynamically
       // const dynamicNamespace = io.of(`/${namespaceName}`);
        
        // Handle events within this dynamic namespace
       // dynamicNamespace.on('connection', (socket) => {
          //  console.log(`Client connected to ${namespaceName} namespace`);
          //  // Handle events within this dynamic namespace
      //  });
   // });

   // const clientDomain = socket.handshake.headers.origin;
   // console.log(clientDomain);
  ///  socketIo.of("/"+clientDomain).on("connection", (socket) => {
   //     console.log("New client connected space: " + socket.id);
  //  });
   
    console.log("New client connected: " + socket.id);

    socket.emit("getId", socket.id);

    socket.on("sendDataClient", function(data) {
        console.log(data);
        const { sender_id, receiver_id, message, timestamp } = data;
        socketIo.emit('sendDataServer', { sender_id, receiver_id, message, timestamp }); 
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
