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
    <div className="text-white">
      <section className="w-[680px] h-fit">
        <div className="flex  gap-12 bg-[url('https://i.ibb.co/syfyH4t/SBS808-LOGOredu-Mini.png')] bg-neutral-900 p-10 rounded-lg">
          <div className="grid place-items-center">
            <div className="grid place-items-center">
              <QRCode
                value={`DNI: ${dni} - Nombre: ${name} ${lastName} - Entradas: ${tickets}`}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between items-center">
            <img
              className="w-64"
              src="https://i.ibb.co/x14BwGV/SBS808-LOGOcomp-RED.png"
            ></img>
            <div className="flex flex-col items-start justify-between mt-4">
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
              <div className="text-start mt-4">
                <p className="text-md">
                  Válido hasta: <strong>{date}</strong>
                </p>
                <p className="text-md">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ticket;
