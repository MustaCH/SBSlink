import React from "react";
import QRCode from "react-qr-code";

function Ticket({ name, lastName, dni, tickets, date, location }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#333",
        borderRadius: "8px",
        width: "40rem",
        margin: "0 auto",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          placeContent: "center",
          gap: "20px",
          backgroundImage:
            'url("https://i.ibb.co/syfyH4t/SBS808-LOGOredu-Mini.png")',
          backgroundColor: "#171717",
          padding: "2.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <img
              style={{ width: "16rem" }}
              src="https://i.ibb.co/x14BwGV/SBS808-LOGOcomp-RED.png"
              alt="SBS808 Logo"
            ></img>
            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <QRCode
                value={`DNI: ${dni} - Nombre: ${name} ${lastName} - Entradas: ${tickets}`}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "start",
              justifyContent: "space-between",
              marginTop: "1rem",
              textAlign: "left",
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
