import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app";

const PORT = 3002;
const server = createServer(app);
const io = new Server(server);

io.on("connection", () => {
  console.log("- Client Connected.");
});

server.listen(PORT, () => {
  console.log(`- App Environment:: ${PORT}`);
});
