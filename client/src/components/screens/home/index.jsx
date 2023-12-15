import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getEvent } from "../../../database/firebase";
import Button from "../../button";
import Input from "../../input";
import Ticket from "../../ticket";
import { useClient } from "../../../context";

function Home() {
  const [existingEvent, setExistingEvent] = useState();
  const { setClientData } = useClient();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("XXXXX");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("XXXXX");
  const [email, setEmail] = useState("XXXXX");
  const [tickets, setTickets] = useState();
  const [selectedTicketCount, setSelectedTicketCount] = useState(0);
  const [inputVal, setInputVal] = useState(false);
  const eventDate = existingEvent?.date;
  const eventLocation = existingEvent?.location;
  const ticketType = existingEvent?.currentTicket;
  const ticketValue = existingEvent?.ticket;
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5173";

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

  const handleGuestName = (e) => {
    let value = e.target.value;
    setName(value);
  };

  const handleGuestLastname = (e) => {
    let value = e.target.value;
    setLastName(value);
  };

  const handleGuestDni = (e) => {
    let value = e.target.value;
    setDni(value);
  };

  const handleGuestEmail = (e) => {
    let value = e.target.value;
    setEmail(value);
  };

  const handleGuestTickets = (e) => {
    let value = parseInt(e.target.value, 10);
    setSelectedTicketCount(value);

    if (existingEvent?.twone === true) {
      value = Math.ceil(value / 2);
    }
    setTickets(value);
  };

  const handlePurchase = async (producto) => {
    const response = await axios.post(`${URL}/Mercado_Pago`, producto);
    const ticketsToStore = existingEvent?.twone ? selectedTicketCount : tickets;

    localStorage.setItem(
      "clientData",
      JSON.stringify({
        name,
        lastName,
        dni,
        email,
        tickets: ticketsToStore,
        date: eventDate,
        twone: existingEvent?.twone,
        ticketValue,
        ticketType,
      })
    );
    window.location.href = response.data;
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
            className="w-56 drop-shadow-xl"
            src="https://i.ibb.co/JvhG82X/SBS808-LOGOcomp-RED.png"
            alt="SBS808-LOGOcomp-RED"
          />
        </div>
      </header>
      <main className="flex flex-col text-center">
        {showForm === false ? (
          <div className="flex flex-col text-white gap-12 items-center mt-10 mb-24 lg:my-10">
            <h1 className="text-2xl uppercase font-semibold  drop-shadow-xl">
              CONSEGUÍ TU ENTRADA ACÁ 🤘
            </h1>
            <div>
              <p className="text-lg mb-5">
                Proxima fecha: <span className="underline">{eventDate}</span>
              </p>
              <p className="text-lg mb-5">{eventLocation}</p>
              <img
                className="w-96 rounded-lg"
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
          <div className="flex flex-col items-center gap-4 mb-24 lg:mb-0">
            <section className="bg-gradient-to-r from-neutral-700/80 to-black/80 px-6 py-8 mt-8  rounded-lg drop-shadow-2xl">
              <div className="text-white flex flex-col lg:flex-row-reverse justify-center w-full mt-8">
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl  font-bold uppercase mb-4">
                    Ingresa tus datos:
                  </h2>
                  <Input
                    label={"Nombre"}
                    labelFor={"firstname"}
                    name={"firstname"}
                    type={"text"}
                    onChange={handleGuestName}
                    customStyle={"w-80"}
                  />
                  <Input
                    label={"Apellido"}
                    labelFor={"lastname"}
                    name={"lastname"}
                    type={"text"}
                    onChange={handleGuestLastname}
                    customStyle={"w-80"}
                  />
                  <Input
                    label={"DNI"}
                    labelFor={"dni"}
                    name={"dni"}
                    type={"text"}
                    onChange={handleGuestDni}
                    customStyle={"w-80"}
                  />
                  <Input
                    label={"Email"}
                    labelFor={"email"}
                    name={"email"}
                    type={"text"}
                    onChange={handleGuestEmail}
                    customStyle={"w-80"}
                  />
                  <Input
                    label={"Entradas"}
                    labelFor={"tickets"}
                    name={"tickets"}
                    type={"number"}
                    onChange={handleGuestTickets}
                  />
                  {existingEvent?.twone === true ? (
                    <div className="flex items-center gap-4 text-xl">
                      <p>
                        <span className="text-red-500 font-bold">2x1</span>{" "}
                        activo
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </section>
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
      <footer className="my-8 text-start">
        <p className="text-xs text-white w-full">
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

export default Home;
