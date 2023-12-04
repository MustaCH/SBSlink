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
import { Head } from "@react-email/head";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
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

  /*const ticketImage = htmlToImage.toPng(ticketRef.current);

  const LayoutEmail = () => {
    return (
      <Html>
        <Section>
          <Container>
            <Text>Bienvenido al infierno</Text>
            <Img src="ticketImage" />
          </Container>
        </Section>
      </Html>
    );
  };

  const layout = render(<LayoutEmail />);

  const sendEmail = async () => {
    await axios.post("http://localhost:4000/nodemailer", {
      email: clientData.email,
      name: clientData.name,
      lastname: clientData.lastName,
      html: layout,
    });
  };*/

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
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold uppercase">Pago aprovado!</h1>
        <div className="mb-8">
          <p className="text-lg">Tus entradas se descargarán automaticamente</p>
          <p className="text-sm">
            En caso de que no se inicie la descarga haz{" "}
            <span
              onClick={() => handleRetryDownload()}
              className="underline cursor-pointer"
            >
              click aquí
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
