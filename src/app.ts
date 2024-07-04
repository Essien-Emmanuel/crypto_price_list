import express from "express";

export const BASE_URL = "https://data.messari.io/api/v1/assets";

const app = express();
app.use(express.json());

export { app };
