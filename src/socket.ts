import { Server } from "socket.io";

export const initializeIO = (server: any) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("connect_error", () => {
      console.log("- Connection Error!❌");
    });
    socket.on("disconnect", () => {
      console.log("- Client Disconnected!!!");
    });

    console.log("- Client Connected!✅");

    io.emit("crypto", "Hello cryto guys");
  });

  return io;
};
