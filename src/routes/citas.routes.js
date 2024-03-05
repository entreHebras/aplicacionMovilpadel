import { Router } from "express";

import {
  guardarReservas,
  login,
  registroUsuario,
  seleccionar,
  seleccionarHorarios,
} from "../controllers/citas.controller.js";

const router = Router();
router.get("/seleccionar/:id", seleccionar);

router.post("/insertarUsuarios", registroUsuario);

router.get("/login/:nombre/:contrasenia", login);

router.get("/seleccionarHorarios/:fecha", seleccionarHorarios);

router.post("/reservas", guardarReservas);
export default router;
