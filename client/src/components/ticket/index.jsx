import React, { useEffect, useState } from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import QRCode from "react-qr-code";

function Ticket({ name, lastName, dni, tickets, date, location }) {
  return (
    <div className="">
      <section className="w-[380px]">
        <div
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
          <div style={{ display: "grid", placeItems: "center" }}>
            <img
              style={{ width: "300px", placeSelf: "center" }}
              src="https://i.ibb.co/rH6fG0Y/SBS808-LOGOcomp-RED.png"
            ></img>
          </div>
          <p style={{ fontSize: "1.3rem", marginBottom: "30px" }}>
            Bienvenido al infierno, <strong>{name}</strong>.
            <br />
            Utiliza éste <strong>código QR</strong> para acceder al evento.
          </p>
          <p>
            Nombre:{" "}
            <strong>
              {name} {lastName}
            </strong>
          </p>
          <p className="mb-4">
            Entradas: <strong>{tickets}</strong>
          </p>
          <div style={{ display: "grid", placeItems: "center" }}>
            <QRCode
              value={`DNI: ${dni} - Nombre: ${name} ${lastName} - Entradas: ${tickets}`}
            />
          </div>
          <p
            style={{
              fontSize: "1.2rem,",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            <strong>Valido hasta:</strong> {date}
          </p>
          <p style={{ fontSize: "0.8rem," }}>{location}</p>
        </div>
      </section>
    </div>
  );
}

export default Ticket;
