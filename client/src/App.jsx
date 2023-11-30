import axios from "axios";
import "./App.css";

function App() {
  const handlePurchase = async (producto) => {
    const response = await axios.post(
      "http://localhost:4000/Mercado_Pago",
      producto
    );
    window.location.href = response.data;
  };

  const sendEmail = async () => {
    await axios.post("http://localhost:4000/nodemailer", {
      email: "polettiignacio7@gmail.com",
      name: "Nacho",
      lastname: "Poletti",
    });
  };

  const product = {
    name: "Entrada Subsuelo808",
    price: 2000,
    quantity: 1,
  };

  return (
    <>
      <header>
        <div class="flex justify-center">
          <img
            class="w-56"
            src="https://i.ibb.co/JvhG82X/SBS808-LOGOcomp-RED.png"
            alt="SBS808-LOGOcomp-RED"
          />
        </div>
      </header>
      <main class="flex flex-col text-center">
        <div class="flex flex-col gap-12 items-center my-20">
          <h1 class="uppercase font-semibold text-white drop-shadow-xl">
            CONSEGUÍ TU ENTRADA ACÁ 🤘
          </h1>
          <button onClick={() => handlePurchase(product)}>Comprar</button>
        </div>
      </main>
      <footer class="my-8">
        <p class="text-xs text-white fixed bottom-0 left-0 px-4 py-4 backdrop-blur-xl w-full">
          Subsuelo 808® es un evento de indole privada. La organización se
          reserva el derecho de admisión o permanencia primando siempre por el
          bienestar de los asistentes, así como del staff del evento y del
          establecimiento donde se lleva a cabo.
          <br />
          Dudas, consultas o reclamos comunicarse por medio de
          <a class="underline" href="https://wa.me/393515755357">
            Whatsapp
          </a>{" "}
          o
          <a class="underline" href="https://www.instagram.com/subsuelo808/">
            Instagram
          </a>
          de lunes a viernes de 10:00hs a 20:00hs.
        </p>
      </footer>
    </>
  );
}

export default App;
