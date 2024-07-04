import axios from "axios";
import express, { Request, Response, NextFunction } from "express";
import { options } from ".";

const app = express();
app.use(express.json());

app.get(
  "/cryptos/profile/:cryptoId",
  async (req: Request, res: Response, _next: NextFunction) => {
    const cryptoId = req.params?.cryptoId;
    if (!cryptoId)
      return res.json({
        message: "Missing request cryptoId param",
      });

    try {
      const response = await axios.request(
        options(`https://data.messari.io/api/v1/assets/${cryptoId}/profile`)
      );
      const data = response.data;
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
