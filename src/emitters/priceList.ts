import axios from "axios";
import { IO } from "../index";
import { BASE_URL } from "../app";
import { options } from "../routes/crypto";

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

    IO.emit("crypto", cryptoPriceLists);
  } catch (error: any) {
    console.log(error);
    IO.emit("crypto", {
      error: true,
      msg: "Error fetching crypto price lists from api",
    });
  }
};

export const emitCryptoPriceLists = () => {
  /** FETCH PRICES EVERY FIVE SECONDS */
  setInterval(() => {
    fetchCryptoPriceLists();
  }, 20000);
};
