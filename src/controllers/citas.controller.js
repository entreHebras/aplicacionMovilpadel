import { pool } from "../Db.js";
import { transporter } from "../email.js";

export const seleccionar = async function (req, res) {
  const id = req.params.id;

  const [er] = await pool.query("select *  from usuarios where IDUsuario=? ", [
    id,
  ]);

  res.send(er);
};

export const registroUsuario = async function (req, res) {
  const { nombreUsuario, correo, contrasenia } = req.body;
  try {
    await pool.query(
      "INSERT INTO usuarios (nombreUsuario,correo,contrasenia) VALUES (?,?,?)",
      [nombreUsuario, correo, contrasenia]
    );
  } catch (error) {
    res.send(error);
  }

  try {
    await transporter.sendMail({
      from: '"entreHebras" <entrehebras06@gmail.com>', // sender address
      to: correo, // list of receivers
      subject: "Notificacion ✔", // Subject line
      html: `
    <b><center> Bienvenido a tu centro de padel </center> </b><br>
   tu usuario:${nombreUsuario}</br>
   tu contraseña:${contrasenia}
    `,
    });
  } catch (error) {
    emailStatus = error;
  }
  res.send("fd");
};
export const login = async function (req, res) {
  const nombre = req.params.nombre;
  const contrasenia = req.params.contrasenia;
  const [er] = await pool.query(
    "select IDUsuario from usuarios where  nombreUsuario=? and contrasenia=?",
    [nombre, contrasenia]
  );

  res.send(er);
};

export const seleccionarHorarios = async function (req, res) {
  const { fecha, horas } = req.body;

  // La consulta SQL necesita tener espacios entre las palabras clave y los nombres de las tablas
  const [er] = await pool.query(
    "SELECT canchas.idCancha, canchas.nombre FROM canchas LEFT JOIN reservas ON canchas.idCancha = reservas.idCancha AND reservas.fecha = ? AND reservas.idHorarios IN (?) WHERE reservas.idCancha IS NULL;",
    [fecha, horas]
  );

  res.send(er);
};

export const seleccionarHorarios1 = async function (req, res) {
  const { fecha, horas } = req.body;

  // La consulta SQL necesita tener espacios entre las palabras clave y los nombres de las tablas
  const [er] = await pool.query("select * from horarios");

  res.send(er);
};
export const seleccionarREservarCliente = async function (req, res) {
  const id = req.params.id;

  const [er] = await pool.query(
    "SELECT reservas.idReserva, usuarios.nombreUsuario, horarios.hora,reservas.fecha FROM reservas JOIN usuarios  ON reservas.idCliente = usuarios.IDUsuario JOIN horarios  ON reservas.idHorarios = horarios.idHora where reservas.idCliente=? ;",
    [id]
  );

  res.send(er);
};

export const guardarReservas = async function (req, res) {
  const reserva = req.body;

  // Verificar si se han proporcionado datos
  if (!reserva) {
    return res.status(400).send("No se proporcionaron datos válidos");
  }

  // Verificar si idHorarios es un array
  if (!Array.isArray(reserva.idHorarios) || reserva.idHorarios.length === 0) {
    return res
      .status(400)
      .send("No se proporcionaron valores válidos para idHorarios");
  }

  try {
    // Mapear los valores de idHorarios a un arreglo bidimensional para la inserción múltiple
    const values = reserva.idHorarios.map((idHorario) => [
      reserva.idCliente,
      reserva.idCancha,
      reserva.Precio,
      idHorario,
      reserva.fecha,
    ]);
    console.log("fgfo");
    // Crear la consulta SQL para la inserción múltiple
    const query = `INSERT INTO reservas (idCliente, idCancha, Precio, idHorarios, fecha) VALUES ?`;

    // Ejecutar la consulta SQL
    await pool.query(query, [values]);

    res
      .status(200)
      .send("Reservas insertadas correctamente en la base de datos");
  } catch (error) {
    console.error("Error al insertar las reservas en la base de datos:", error);
    res.status(500).send("Error al insertar las reservas en la base de datos");
  }
};
