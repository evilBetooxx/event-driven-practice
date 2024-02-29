import express from "express";
import { Server } from "socket.io";

const app = express();

const port = 3002;

app.use(express.json());

const server = app.listen(port, () => {
  console.log("Servidor WebSocket corriendo en el puerto", port);
});

const io: Server = new Server(server);

io.on("connection", (socket) => {
  console.log("Usuario Conectado");

  socket.on("payment", (payment) => {
    console.log("Pago recibido: ", payment);
    socket.emit("payment", payment);
  });

  socket.on("disconnect", () => {
    console.log("Usuario Desconectado");
  });
});
