import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useClient } from "../../../context";
import { Link } from "react-router-dom";
import { getEvent, handleStoreGuest } from "../../../database/firebase";
import Ticket from "../../ticket";
import Button from "../../button";
import { quantum } from "ldrs";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Html } from "@react-email/html";
import { render } from "@react-email/render";

function Approved() {
  const [existingEvent, setExistingEvent] = useState();
  const { clientData, setClientData } = useClient();
  const ticketRef = useRef();
  quantum.register();

  useEffect(() => {
    const storedClientData = localStorage.getItem("clientData");
    if (storedClientData) {
      setClientData(JSON.parse(storedClientData));
    }

    const fetchData = async () => {
      try {
        const event = await getEvent();
        if (event) {
          setExistingEvent(event);
        }
      } catch (error) {
        console.error("Error fetching event data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (clientData && existingEvent) {
      handleCreateInvite();
    }
  }, [clientData, existingEvent]);

  const LayoutEmail = () => {
    return (
      <Html>
        <Ticket
          name={clientData?.name}
          lastName={clientData?.lastName}
          dni={clientData?.dni}
          tickets={clientData?.tickets}
          date={existingEvent?.date}
          location={existingEvent?.location}
        />
      </Html>
    );
  };

  const layout = render(<LayoutEmail />);

  const sendEmail = async () => {
    await axios.post("http://localhost:4000/nodemailer", {
      email: clientData.email,
      name: clientData.name,
      lastname: clientData.lastName,
      location: existingEvent?.location,
      date: existingEvent?.date,
      pdfFile: layout,
    });
  };

  const handleCreateInvite = () => {
    if (clientData && existingEvent) {
      const { name, lastName, dni, email, tickets } = clientData;

      handleStoreGuest({
        name,
        lastName,
        dni,
        email,
        tickets,
        date: existingEvent?.date,
        twone: existingEvent?.twone,
        ticketValue: existingEvent?.ticket,
        ticketType: existingEvent?.currentTicket,
      });

      sendEmail();
    }
  };

  const handleRetryDownload = () => {
    if (clientData && existingEvent) {
      const { name, lastName, dni, email, tickets } = clientData;
      for (let i = 0; i < tickets; i++) {
        htmlToImage
          .toPng(ticketRef.current)
          .then((dataUrl) => {
            download(dataUrl, `ticket${name}${lastName}_${i + 1}.png`);
          })
          .catch((error) => {
            console.error("Error al generar la imagen:", error);
          });
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-4 text-white">
        <h1 className="text-xl font-bold uppercase">Pago aprobado!</h1>
        <div className="mb-8">
          <p className="text-lg">
            Recibirás tus entradas vía al email que proporcionaste
          </p>
          <p className="text-sm">
            Si no recibís el email podés descargarlas haciendo{" "}
            <span
              onClick={() => handleRetryDownload()}
              className="underline cursor-pointer"
            >
              click acá
            </span>
          </p>
        </div>
      </div>
      {!clientData || !existingEvent ? (
        <div className="py-36">
          <l-quantum size="60" speed="1.75" color="white"></l-quantum>
        </div>
      ) : (
        <div className="flex justify-center">
          <div ref={ticketRef} className="w-fit">
            <Ticket
              name={clientData.name}
              lastName={clientData.lastName}
              dni={clientData.dni}
              tickets={clientData.tickets}
              date={existingEvent?.date}
              location={existingEvent?.location}
            />
          </div>
        </div>
      )}
      <div className="mt-4">
        <Link to={"/"}>
          <Button name={"Volver a inicio"} />
        </Link>
      </div>
    </div>
  );
}

export default Approved;
