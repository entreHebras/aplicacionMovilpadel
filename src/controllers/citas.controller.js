import { pool } from "../Db.js";
import { transporter } from "../email.js";

export const registroUsuario = async function (req, res) {
  const { nombre, correo, contrasenia } = req.body;

  await pool.execute(
    "INSERT INTO usuarios (nombreUsuario,correo,contrasenia) VALUES (?,?,?)",
    [nombre, correo, contrasenia]
  );

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
  const [er] = await pool.query("select *  from usuarios");

  res.send(er);
};
