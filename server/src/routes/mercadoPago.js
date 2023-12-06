const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const mercadoPago = Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN || "",
});

mercadoPago.post("/", async (req, res) => {
  const producto = req.body;
  try {
    const preference = {
      items: [
        {
          title: producto.name,
          unit_price: producto.price,
          currency_id: "ARS",
          quantity: producto.quantity,
        },
      ],
      back_urls: {
        success: "https://subsuelo808-tickets.onrender.com/approved",
        failure: "https://subsuelo808-tickets.onrender.com/declined",
      },
      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.response.init_point);
  } catch (error) {
    console.log(error.messege);
    res.status(500).json(error.message);
  }
});

module.exports = mercadoPago;
