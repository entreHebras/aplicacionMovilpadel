import { Router } from "express";

import {
  registroUsuario,
  seleccionar,
} from "../controllers/citas.controller.js";

const router = Router();
router.get("/seleccionar", seleccionar);

router.post("/insertarUsuarios", registroUsuario);
export default router;
