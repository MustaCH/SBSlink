const express = require("express");
const transporter = require("../config/nodemailer");
const nodemailerRouter = express.Router();

nodemailerRouter.post("/", async (req, res) => {
  try {
    const { email, name, lastname } = req.body;
    await transporter.sendMail({
      from: "Subsuelo 808",
      subject: "Tu entrada para Subsuelo808",
      to: email,
      html: `<h1>Hola ${name} ${lastname}</h1>
      <p>Tu entrada adquirida con éxito</p>`,
    });
    res.status(200).json({ message: "Email enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un problema al enviar el email" });
  }
});

module.exports = nodemailerRouter;
