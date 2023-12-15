import React from "react";
import { Link } from "react-router-dom";

function Declined() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center text-white py-56">
      <div>
        <h1 className="text-2xl">Pago rechazado o cancelado</h1>
        <p>Volvé a intentarlo</p>
      </div>
      <Link
        className="w-52 bg-gradient-to-r from-rose-700 to-red-600 p-2 rounded-lg text-white hover:scale-110 duration-150 drop-shadow-xl"
        to={"/"}
      >
        Volver atrás
      </Link>
    </div>
  );
}

export default Declined;
