import { config } from "dotenv";
import { createServer } from "http";
import axios from "axios";
import { Server } from "socket.io";
import { app } from "./app";

config();

const PORT = process.env.PORT;
const server = createServer(app);
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

server.listen(PORT, () => {
  console.log(`- App Environment:: ${PORT}`);
});

const fetchCryptoPriceLists = async () => {
  const options = {
    method: "GET",
    url: process.env.CRYPTO_LIST_URL,
    headers: {
      accept: "application/json",
    },
  };
  const response = await axios.request(options);
  if (response.status !== 200)
    console.log(`Error fetching crypto list with code:: ${response.status}`);

  const cryptoPriceListData = response.data.data;

  const cryptoPriceLists = cryptoPriceListData.map((list: any) => {
    return {
      id: list.id,
      name: list.slug,
      symbol: list.symbol,
      price: list.metrics.market_data.price_usd,
    };
  });

  io.emit("crypto", cryptoPriceLists);
};

/** FETCH PRICES EVERY FIVE SECONDS */
setInterval(() => {
  fetchCryptoPriceLists();
}, 5000);
