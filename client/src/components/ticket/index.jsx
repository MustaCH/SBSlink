import React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import QRCode from "react-qr-code";

function Ticket({ name, lastName, dni, tickets, date, location }) {
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
              style={{ width: "300px" }}
              src="https://i.ibb.co/rH6fG0Y/SBS808-LOGOcomp-RED.png"
            ></Img>
          </Container>
          <Text style={{ fontSize: "1.3rem", marginBottom: "30px" }}>
            Bienvenido al infierno, <span className="font-bold">{name}</span>.
            <br />
            Utiliza éste <span className="font-bold">código QR</span> para
            acceder al evento.
          </Text>
          <Text>
            Nombre: {name} {lastName}
          </Text>
          <Container style={{ display: "grid", placeItems: "center" }}>
            <QRCode
              value={`DNI: ${dni} - Nombre: ${name} ${lastName} - Entradas: ${tickets}`}
            />
          </Container>

          <Text style={{ fontSize: "1.2rem,", fontWeight: "bold" }}>
            Valido hasta: {date}
          </Text>
          <Text style={{ fontSize: "0.8rem," }}>{location}</Text>
        </Container>
      </Section>
    </div>
  );
}

export default Ticket;
