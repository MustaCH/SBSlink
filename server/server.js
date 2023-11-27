const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const mercadopago = require("mercadopago");

const client = new mercadopago.MercadoPagoConfig({
  accessToken:
    "TEST-5479126336302447-111912-a37934dde975afd17c29f6f78a0b7daf-528853611",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "client", "index.html");
  res.sendFile(filePath);
});

const preference = new mercadopago.Preference();

app.post("/create_preference", (req, res) => {
  preference
    .create({
      items: [
        {
          title: req.body.description,
          quantity: Number(req.body.quantity),
          currency_id: "es-AR",
          unit_price: Number(req.body.price),
        },
      ],
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(8080, () => {
  console.log("The server is now running on Port 8080");
});
