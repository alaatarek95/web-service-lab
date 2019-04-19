const EventEmitter = require("events");
const express = require("express");
const http = require("http");
const { Server } = require("ws");

const app = express();
app.use(express.static("static"));

const store = {};
const storeEvents = new EventEmitter();

const server = http.Server(app);
const wsServer = new Server({ server });
server.listen(8000);

wsServer.on("connection", ws => {
  let myKey = "";
  let cb = null;

  ws.on("message", rawMessage => {
    const message = JSON.parse(rawMessage);

    switch (message.type) {
      case "key-update":
        if (cb !== null) storeEvents.removeListener(myKey, cb);

        myKey = message.value;

        ws.send(
          JSON.stringify({ type: "value-update", value: store[myKey] || [] })
        );

        cb = value => ws.send(JSON.stringify({ type: "value-update", value }));
        storeEvents.on(myKey, cb);
        break;
      case "value-update":
      console.log(message);
      if(!store[message.to]){
        store[message.to]=[];
      }
        store[message.to].push(message.value);
        storeEvents.emit(message.to,store[message.to]);
        break;
      default:
        throw new Error();
    }
  });
});
