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

export const registroEmpleados = async function (req, res) {
  const {
    Nombre,
    Apellido,
    Telefono,
    CorreoElectronico,
    direccion,
    contrasenia,
    CorreoElectronico2,
  } = req.body;

  const [er] = await pool.query("select usuario from login where usuario=?", [
    CorreoElectronico2,
  ]);

  if (er.length <= 0) {
    const [result] = await pool.execute(
      "INSERT INTO tablaclientes (Nombre, Apellido, Telefono,CorreoElectronico,direccion) VALUES (?,?,?,?,?)",
      [Nombre, Apellido, Telefono, CorreoElectronico, direccion]
    );

    const lastInsertId = result.insertId;

    await pool.execute(
      "insert into login(usuario,contrasena,tipo_usuario,cliente_id) VALUES(?,?,?,?) ",
      [CorreoElectronico, contrasenia, 2, lastInsertId]
    );

    try {
      await transporter.sendMail({
        from: '"entreHebras" <entrehebras06@gmail.com>', // sender address
        to: CorreoElectronico2, // list of receivers
        subject: "Notificacion ✔", // Subject line
        html: `
      <b><center> Tu tikect </center> </b><br>
       <b>Tu cita : ${Nombre}, ${Apellido}  </b> <br>
       

      `,
      });
    } catch (error) {
      emailStatus = error;
    }

    res.json({ lastInsertId });
  } else {
    console.log("correo electronico ya registrado");
    res.status(404).json({ mesanje: "correo electronico ya registradonpm" });
  }
};
