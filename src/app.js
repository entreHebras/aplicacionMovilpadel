import express from "express";
import citasCuentas from "./routes/citas.routes.js";
import "./config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(citasCuentas);
export default app;
