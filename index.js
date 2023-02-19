import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile("public/index.html");
});


io.on('connection', (socket) => {
  socket.on("user join", (user) => {
    socket.broadcast.emit("join_active", user);
  })
  socket.on("active", (name)=>{
    socket.broadcast.emit("active-user", name);
  })
  socket.on("Notify", data =>{
    socket.broadcast.emit("notification", data);
  })
  socket.on("message", data => {
    socket.broadcast.emit("chat", data);
  })
  socket.on("input", data =>{
    socket.broadcast.emit("input", data);
  })
});

server.listen(9040, () => {
  console.log('listening on *:9040');
});
