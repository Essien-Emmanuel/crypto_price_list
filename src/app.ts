import axios from "axios";
import express, { Request, Response, NextFunction } from "express";
import { options } from ".";

export const BASE_URL = "https://data.messari.io/api/v1/assets";
const app = express();
app.use(express.json());

app.get(
  "/cryptos/profile/:id",
  async (req: Request, res: Response, _next: NextFunction) => {
    const cryptoId = req.params?.id;
    if (!cryptoId)
      return res.json({
        message: "Missing request cryptoId param",
      });

    try {
      const response = await axios.request(
        options(`${BASE_URL}/${cryptoId}/profile`)
      );
      const data = response.data.data;
      return res.status(200).json({
        message: "fetched crypto detail successfully",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: true,
        msg: "Error fetching crypto price lists from api",
        errorDetails: error,
      });
    }
  }
);

app.get(
  "/cryptos/market-data/:id",
  async (req: Request, res: Response, _next: NextFunction) => {
    const cryptoId = req.params?.id;
    if (!cryptoId)
      return res.json({
        message: "Missing request cryptoId param",
      });

    try {
      const response = await axios.request(
        options(`${BASE_URL}/${cryptoId}/metrics/market-data`)
      );
      const data = response.data.data;
      return res.status(200).json({
        message: "fetched crypto detail successfully",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: true,
        msg: "Error fetching crypto price lists from api",
        errorDetails: error,
      });
    }
  }
);

export { app };
