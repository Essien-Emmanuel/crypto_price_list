import { config } from "dotenv";
import { createServer } from "http";
import { app } from "./app";
import { initializeIO } from "./socket";
import { emitCryptoPriceLists } from "./emitters/priceList";

config();

const PORT = process.env.PORT;

const server = createServer(app);

export const IO = initializeIO(server);

emitCryptoPriceLists();

server.listen(PORT, () => {
  console.log(`- App Environment:: ${PORT}`);
});
