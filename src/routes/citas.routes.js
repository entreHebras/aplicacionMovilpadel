import { Router } from "express";

import { registroUsuario } from "../controllers/citas.controller.js";

const router = Router();

router.post("/insertarUsuarios", registroUsuario);
export default router;
