const server = require("./server");
const dotenv = require("dotenv");
dotenv.config();

server.listen(process.env.PORT, () =>
  console.log("Servidor levantado con exito")
);

/*TU MAMÁ*/
