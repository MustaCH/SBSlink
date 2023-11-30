import React, { useEffect, useState } from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";

function Ticket({ name, lastName, dni, tickets, date, location }) {
  const [ticketElement, setTicketElement] = useState();

  useEffect(() => {
    const generateImage = async () => {
      setTicketElement(
        <QRCode
          value={`DNI: ${dni} - Nombre: ${name} ${lastName} - Entradas: ${tickets}`}
        />
      );

      try {
        const dataUrl = await htmlToImage.toPng(ticketElement);
        console.log("Imagen generada:", dataUrl);
        // Aquí podrías enviar la imagen por correo electrónico o mostrarla en tu aplicación
      } catch (error) {
        console.error("Error al generar la imagen:", error);
      }
    };

    generateImage();
  }, [dni, name, lastName, tickets, date, location]);

  return (
    <div className="hidden">
      <Section className="w-[380px]">
        <Container
          style={{
            display: "grid",
            placeItems: "center",
            margin: "0 auto",
            textAlign: "center",
            color: "white",
            padding: "20px 48px",
            backgroundColor: "#7f1d1d",
            borderRadius: "10px",
          }}
        >
          <Container style={{ display: "grid", placeItems: "center" }}>
            <Img
              style={{ width: "300px", placeSelf: "center" }}
              src="https://i.ibb.co/rH6fG0Y/SBS808-LOGOcomp-RED.png"
            ></Img>
          </Container>
          <Text style={{ fontSize: "1.3rem", marginBottom: "30px" }}>
            Bienvenido al infierno, <strong>{name}</strong>.
            <br />
            Utiliza éste <strong>código QR</strong> para acceder al evento.
          </Text>
          <Text>
            Nombre: {name} {lastName}
          </Text>
          <Container style={{ display: "grid", placeItems: "center" }}>
            <Img src={ticketElement} style={{ width: "200px" }}></Img>
          </Container>
          <Text style={{ fontSize: "1.2rem,", fontWeight: "bold" }}>
            <strong>Valido hasta:</strong> {date}
          </Text>
          <Text style={{ fontSize: "0.8rem," }}>{location}</Text>
        </Container>
      </Section>
    </div>
  );
}

export default Ticket;
