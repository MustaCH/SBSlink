const express = require("express");
const transporter = require("../config/nodemailer");
const pdf = require("html-pdf");
const nodemailerRouter = express.Router();

nodemailerRouter.post("/", async (req, res) => {
  try {
    const { email, name, lastname, html } = req.body;

    pdf.create(html).toBuffer(async (err, buffer) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Hubo un problema al crear el PDF" });
        return;
      }

      try {
        await transporter.sendMail({
          from: "Subsuelo 808",
          subject: `Hola ${name}, tu entrada para Subsuelo808 llegó!`,
          to: email,
          html: `<div>
                    <h1>Bienvenido al infierno ${name}</h1>
                    <p>Tu entrada para acceder al evento está adjunta a éste email<p>
                  <img style="width: 200px" src="https://i.ibb.co/x14BwGV/SBS808-LOGOcomp-RED.png" alt="sbslogo"></img>
                  </div>`,
          attachments: [
            {
              filename: "entradaSbs.pdf",
              content: buffer,
              contentType: "application/pdf",
            },
          ],
        });
        res.status(200).json({ message: "Email enviado correctamente" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al enviar el email" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un problema al crear el PDF" });
  }
});

module.exports = nodemailerRouter;
