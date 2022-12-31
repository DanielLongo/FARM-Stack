import React, { useContext } from "react";
import clsx from "clsx";

function Button({ text, onClick, size, disabled, type }) {
  const CLASSNAME = `
    items-center 
    inline 
    justify-center 
    px-3 
    py-1.5 
    border-transparent 
    rounded-md 
    shadow-sm 
    text-white 
    text-${size} 
    font-medium 
    border 
    border-primary-200 
    hover:bg-primary-700 
    disabled:bg-primary-300 
    disabled:cursor-not-allowed 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-primary-600
    bg-primary-600
    `;

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={clsx(CLASSNAME)}
    >
      {text}
    </button>
  );
}

export default Button;
