import React from "react";

function Button({ name, onClick, customStyle }) {
  const buttonStyle =
    "bg-gradient-to-r from-rose-700 to-red-600 p-2 rounded-lg text-white hover:scale-110 duration-150 drop-shadow-xl";

  const style = `${buttonStyle} ${customStyle || ""}`;

  return (
    <button onClick={onClick} className={customStyle ? style : buttonStyle}>
      {name}
    </button>
  );
}

export default Button;
