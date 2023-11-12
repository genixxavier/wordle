import React from "react";
import { IBoxWord } from "../interfaces/BoxWordInterface";

export default function BoxWord({ word, type, color, status }: IBoxWord) {
  let boxStyle = type === 'keyboard' ?  "bg-gray-200 dark:hover:bg-gray-300 text-black hover:bg-gray-300 cursor-pointer dark:bg-gray-800 dark:text-white" : "bg-white dark:bg-gray-200 border-gray-700";
  let sizeBox = type === 'keyboard' ? 'w-[45px] h-[51px]' : 'w-[75px] h-[76px]'
  let sizeText = type === 'keyboard' ? 'text-[18px]' : 'text-[35px]'
  let classEnter = (word ==='Enter' || word === 'Backspace' ) ? 'w-auto px-4' : ''

  if (status === "correct") {
    boxStyle = `bg-green-600 ${color ? `text-${color}` : "text-white"}`;
  } else if (status === "incorrect") {
    boxStyle = `bg-yellow-500 ${color ? `text-${color}` : "text-white"}`;
  } else if (status === "no-found") {
    boxStyle = `bg-gray-400 ${color ? `text-${color}` : "text-white"}`;
  } else if (status === "without-word") {
    boxStyle = `bg-gray-200 dark:bg-gray-700 dark:text-white ${color ? `text-${color}` : "text-black"}`;
  }

  return (
    <div className={`border rounded-md flex justify-center items-center dark:border-0 ${sizeBox} ${boxStyle} ${classEnter}`}>
      {word === 'Backspace' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17" className="dark:text-white">
            <path d="M9.94968 4.31639L13.587 7.78048L17.2243 4.31639L18.3244 5.47152L14.7435 8.88191L18.3244 12.2923L17.2243 13.4474L13.587 9.98334L9.94968 13.4474L8.84955 12.2923L12.4305 8.88191L8.84955 5.47152L9.94968 4.31639Z"  />
            <path fillRule="evenodd" clipRule="evenodd" d="M6.68607 0.906006C6.39072 0.906006 6.1119 1.04237 5.93057 1.27551L0.47151 8.2943C0.202693 8.63992 0.202694 9.1239 0.47151 9.46952L5.93057 16.4883C6.1119 16.7214 6.39071 16.8578 6.68607 16.8578H21.6027C22.1313 16.8578 22.5599 16.4293 22.5599 15.9007V1.86311C22.5599 1.33451 22.1313 0.906006 21.6027 0.906006H6.68607ZM2.03536 8.88191L6.99814 2.50119H20.9647V15.2626H6.99814L2.03536 8.88191Z"  />
          </svg>
      ) : (
        <p className={`font-bold uppercase leading-none ${sizeText}`}>{word}</p>
      )}
    </div>
  );  
}
