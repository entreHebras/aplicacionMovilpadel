import { Router } from "express";

import {
  registroUsuario,
  seleccionar,
} from "../controllers/citas.controller.js";

const router = Router();

router.post("/insertarUsuarios", registroUsuario);
export default router;

router.get("/seleccionar", seleccionar);
