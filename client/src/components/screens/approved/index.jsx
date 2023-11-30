import React from "react";
import { Link } from "react-router-dom";

function Approved() {
  return (
    <div>
      <h1>Pago aprovado!</h1>
      <p>Recibirás tus entradas vía email en las proximas horas</p>
      <p>{"(No olvides revisar la carpeta de SPAM)"}</p>
      <Link to={"/"}>Volver</Link>
    </div>
  );
}

export default Approved;
