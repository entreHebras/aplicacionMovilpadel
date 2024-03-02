import { Router } from "express";

import {
  login,
  registroUsuario,
  seleccionar,
} from "../controllers/citas.controller.js";

const router = Router();
router.get("/seleccionar", seleccionar);

router.post("/insertarUsuarios", registroUsuario);

router.get("/login/:nombre/:contrasenia", login);
export default router;
