import axios from "axios";
import "./App.css";
import TicketForm from "./components/ticketForm";
import { useEffect, useState } from "react";
import { getEvent } from "./database/firebase";
import Button from "./components/button";
import Input from "./components/input";

function App() {
  const [existingEvent, setExistingEvent] = useState();
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState();

  useEffect(() => {
    const currentEvent = async () => {
      try {
        const event = await getEvent();
        if (event) {
          setExistingEvent(event);
        }
      } catch (error) {
        console.error("Error al verificar el evento existente: ", error);
      }
    };

    currentEvent();
  }, []);

  const ticketPrice = parseInt(existingEvent?.ticket);

  const handlePurchase = async (producto) => {
    const response = await axios.post(
      "http://localhost:4000/Mercado_Pago",
      producto
    );
    window.location.href = response.data;
  };

  const handleGuestTickets = (e) => {
    let value = parseInt(e.target.value, 10);
    if (existingEvent?.twone === true) {
      value = Math.ceil(value / 2);
    }
    setTickets(value);
  };

  const sendEmail = async () => {
    await axios.post("http://localhost:4000/nodemailer", {
      email: "polettiignacio7@gmail.com",
      name: "Nacho",
      lastname: "Poletti",
    });
  };

  const product = {
    name: `Entrada Subuselo808`,
    price: ticketPrice,
    quantity: tickets,
  };

  return (
    <>
      <header>
        <div className="flex justify-center">
          <img
            className="w-56"
            src="https://i.ibb.co/JvhG82X/SBS808-LOGOcomp-RED.png"
            alt="SBS808-LOGOcomp-RED"
          />
        </div>
      </header>
      <main className="flex flex-col text-center">
        {showForm === false ? (
          <div className="flex flex-col gap-12 items-center mt-10 mb-24 lg:my-10">
            <h1 className="text-2xl uppercase font-semibold text-white drop-shadow-xl">
              CONSEGUÍ TU ENTRADA ACÁ 🤘
            </h1>
            <div>
              <p className="text-lg mb-5">
                Proxima fecha: {existingEvent?.date}
              </p>
              <img
                className="w-96"
                src={existingEvent?.link}
                alt="event-flyer"
              />
            </div>
            <Button
              name={"Comprar"}
              customStyle={"px-8"}
              onClick={() => setShowForm(true)}
            >
              Comprar
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <TicketForm />
            <Input
              label={"Entradas"}
              labelFor={"tickets"}
              name={"tickets"}
              type={"number"}
              customStyle={"text-white"}
              onChange={handleGuestTickets}
            />
            {existingEvent?.twone === true ? (
              <div className="flex items-center gap-4 text-xl">
                <p>
                  <span className="text-red-500 font-bold">2x1</span> activo!
                  Aprovechalo!
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="mt-8">
              <Button
                name={"Ir a pagar"}
                onClick={() => handlePurchase(product)}
                customStyle={"px-12"}
              />
            </div>
          </div>
        )}
      </main>
      <footer className="my-8">
        <p className="text-xs text-white fixed bottom-0 left-0 px-4 py-4 backdrop-blur-xl w-full">
          Subsuelo 808® es un evento de indole privada. La organización se
          reserva el derecho de admisión o permanencia primando siempre por el
          bienestar de los asistentes, así como del staff del evento y del
          establecimiento donde se lleva a cabo.
          <br />
          Dudas, consultas o reclamos comunicarse por medio de{" "}
          <a className="underline" href="https://wa.me/393515755357">
            Whatsapp
          </a>{" "}
          o{" "}
          <a
            className="underline"
            href="https://www.instagram.com/subsuelo808/"
          >
            Instagram
          </a>{" "}
          de lunes a viernes de 10:00hs a 20:00hs.
        </p>
      </footer>
    </>
  );
}

export default App;
