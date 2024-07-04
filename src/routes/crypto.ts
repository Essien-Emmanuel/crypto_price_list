import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import { BASE_URL } from "../app";

const router = Router();

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

router.get(
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

router.get(
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

export { router };
