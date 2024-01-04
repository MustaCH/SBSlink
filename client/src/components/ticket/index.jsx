import React from "react";
import QRCode from "react-qr-code";

function Ticket({ name, lastName, dni, tickets, date, location }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#333",
        borderRadius: "8px",
        width: "450px",
        margin: "0 auto",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage:
            'url("https://i.ibb.co/syfyH4t/SBS808-LOGOredu-Mini.png")',
          backgroundColor: "#171717",
          padding: "2.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <div
          style={{
            gap: "2rem",
            placeItems: "center",
          }}
        >
          <img
            style={{ width: "16rem", marginLeft: "56.25px" }}
            src="https://i.ibb.co/x14BwGV/SBS808-LOGOcomp-RED.png"
            alt="SBS808 Logo"
          ></img>
          <div style={{ marginLeft: "56.25px", marginTop: "12px" }}>
            <QRCode
              value={`DNI: ${dni} - Nombre: ${name} ${lastName} - Entradas: ${tickets}`}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "start",
              justifyContent: "space-between",
              marginTop: "24px",

              textAlign: "center",
              color: "white",
            }}
          >
            <p>
              Nombre:{" "}
              <strong>
                {name} {lastName}
              </strong>
            </p>
            <p>
              DNI: <strong>{dni}</strong>
            </p>
            <p>
              Entradas: <strong>{tickets}</strong>
            </p>
            <div>
              <p>
                Válido hasta: <strong>{date}</strong>
              </p>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
