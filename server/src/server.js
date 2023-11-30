const express = require("express");
const cors = require("cors");
const server = express();

// - Routes:
const nodemailerRoutes = require("./routes/nodemailer-routes");
const mercadoPago = require("./routes/mercadoPago");

server.use(cors());
server.use(express.json());
server.use("/Mercado_Pago", mercadoPago);
server.use("/nodemailer", nodemailerRoutes);

module.exports = server;
