import { Router } from "express";

import {
  guardarReservas,
  login,
  registroUsuario,
  seleccionar,
  seleccionarHorarios,
  seleccionarHorarios1,
  seleccionarREservarCliente,
} from "../controllers/citas.controller.js";

const router = Router();
router.get("/seleccionar/:id", seleccionar);

router.post("/insertarUsuarios", registroUsuario);

router.get("/login/:nombre/:contrasenia", login);
router.get("/seleccionarHorarios2", seleccionarHorarios1);

router.post("/seleccionarHorarios", seleccionarHorarios);

router.get("/seleccionarReservasCliente/:id", seleccionarREservarCliente);

router.post("/reservas", guardarReservas);
export default router;
