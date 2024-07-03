import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app";

const PORT = 3002;
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("connect_error", () => {
    console.log("- Connection Error.❌");
  });
  socket.on("disconnect", () => {
    console.log("- Client Disconnected");
  });

  console.log("- Client Connected.✅");

  io.emit("crypto", "Hello cryto guys");
});

server.listen(PORT, () => {
  console.log(`- App Environment:: ${PORT}`);
});
