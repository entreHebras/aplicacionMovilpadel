import express from "express";
import citasCuentas from "./routes/citas.routes.js";
import cookieParser from "cookie-parser";

import "./config.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(citasCuentas);
export default app;
