const express = require("express");
const cors = require("cors");
const server = express();

// - Routes:
const nodemailerRoutes = require("./routes/nodemailer-routes");

server.use(cors());
server.use(express.json());

server.use("/nodemailer", nodemailerRoutes);

module.exports = server;
