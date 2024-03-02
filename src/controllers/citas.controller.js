import { pool } from "../Db.js";
import { transporter } from "../email.js";

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
    <b><center> Bienvenido a tu nuevo trabajo en pocos dias notificaremos de mas novedades </center> </b><br>
   
    `,
    });
  } catch (error) {
    emailStatus = error;
  }
  res.send("fd");
};

export const seleccionar = async function (req, res) {
  const id = req.params.id;

  const [er] = await pool.query("select *  from usuarios where IDUsuario=? ", [
    id,
  ]);

  res.send(er);
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
