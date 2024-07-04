import { config } from "dotenv";
import { createServer } from "http";
import axios from "axios";
import { Server } from "socket.io";
import { BASE_URL, app } from "./app";

config();

const PORT = process.env.PORT;
const server = createServer(app);

export const io = new Server(server);

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

export const options = (url: string) => {
  return {
    method: "GET",
    url: url,
    headers: {
      accept: "application/json",
      "x-messari-api-key": process.env.API_KEY,
    },
  };
};

const fetchCryptoPriceLists = async () => {
  try {
    const response = await axios.request(
      options(`${BASE_URL}?fields=id,slug,symbol,metrics/market_data/price_usd`)
    );
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
  } catch (error: any) {
    console.log(error);
    io.emit("crypto", {
      error: true,
      msg: "Error fetching crypto price lists from api",
    });
  }
};

/** FETCH PRICES EVERY FIVE SECONDS */
setInterval(() => {
  fetchCryptoPriceLists();
}, 20000);
