const EventEmitter = require("events");
const { Server } = require("ws");

const wsServer = new Server({
  port: 8000
});

let message = "";
let messageEvent = new EventEmitter();

wsServer.on("connection", ws => {
  // /get
  ws.send(message);

  // /update
  ws.on("message", newMessage => {
    message = newMessage;
    console.log(newMessage);
    messageEvent.emit("new", message);
  });

  // /get-changes
  messageEvent.on("new", message => ws.send(message));
});
