import React from "react";
import { Link } from "react-router-dom";

function Declined() {
  return (
    <div>
      <h1>Pago rechazado o cancelado</h1>
      <Link to={"/"}>Volver atrás</Link>
    </div>
  );
}

export default Declined;
