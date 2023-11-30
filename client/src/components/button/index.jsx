import React from "react";

function Button({ name, onClick, customStyle }) {
  const buttonStyle =
    "bg-red-700 p-2 rounded-lg text-white hover:scale-110 duration-150";

  const style = `${buttonStyle} ${customStyle || ""}`;

  return (
    <button onClick={onClick} className={customStyle ? style : buttonStyle}>
      {name}
    </button>
  );
}

export default Button;
