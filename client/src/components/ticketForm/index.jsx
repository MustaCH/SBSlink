import React, { useEffect, useRef, useState } from "react";
import Input from "../input/index";
import Button from "../button";
import Ticket from "../ticket";
import { getEvent, handleStoreGuest } from "../../database/firebase";

function TicketForm() {
  const [existingEvent, setExistingEvent] = useState();
  const [name, setName] = useState("XXXXX");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("XXXXX");
  const [email, setEmail] = useState("XXXXX");
  const [tickets, setTickets] = useState("XX");
  const [twone, setTwone] = useState(false);
  const eventDate = existingEvent?.date;
  const eventLocation = existingEvent?.location;
  const ticketType = existingEvent?.currentTicket;
  const ticketValue = existingEvent?.ticket;
  const ticketRef = useRef();

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

  const handleTwone = (e) => {
    setTwone(true);
  };

  const handleCreateInvite = () => {
    handleStoreGuest({
      name,
      lastName,
      dni,
      email,
      tickets,
      date,
      twone,
      ticketValue,
      ticketType,
    });
  };

  return (
    <section>
      <div className="text-white flex flex-col lg:flex-row-reverse justify-center w-full mt-8">
        <div className="flex flex-col items-center gap-4 ps-8 lg:ps-0">
          <h2 className="text-2xl  font-bold uppercase mb-8">
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
        </div>
        <div ref={ticketRef}>
          <Ticket
            name={name}
            lastName={lastName}
            dni={dni}
            tickets={tickets}
            date={eventDate}
            location={eventLocation}
          />
        </div>
      </div>
    </section>
  );
}

export default TicketForm;
