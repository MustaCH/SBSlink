const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "subsuelo808@gmail.com",
    pass: "aeyw arwu dpde dysk",
  },
});

transporter
  .verify()
  .then(() => console.log("Transporter creado con exito..."))
  .catch((error) => console.error(error));

module.exports = transporter;
