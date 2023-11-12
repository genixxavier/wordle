import React from "react";
import BoxWord from "./shared/BoxWord";
import { IBoxWord } from "./interfaces/BoxWordInterface";

interface InstructionsProps {
  onStartGame?: () => void;
  hiddenButton?: boolean;
}

const Instructions: React.FC<InstructionsProps> = ({
  onStartGame,
  hiddenButton = false,
}) => {
  const wordCorrect: IBoxWord[] = [
    { word: "G", status: "correct", color: "black" },
    { word: "A", color: "black" },
    { word: "T", color: "black" },
    { word: "O", color: "black" },
    { word: "S", color: "black" },
  ];

  const wordIncorrect: IBoxWord[] = [
    { word: "V", color: "black" },
    { word: "O", color: "black" },
    { word: "C", status: "incorrect", color: "black" },
    { word: "A", color: "black" },
    { word: "L", color: "black" },
  ];

  const wordNotfound: IBoxWord[] = [
    { word: "C", color: "black" },
    { word: "A", color: "black" },
    { word: "N", color: "black" },
    { word: "T", color: "black" },
    { word: "O", status: "no-found", color: "black" },
  ];

  return (
    <div className="w-[546px] mx-auto py-10 ">
      <div className="bg-gray-50 rounded-md border-gray-700 border-solid border py-10 px-10 text-justify">
        <h1 className="text-2xl font-bold pb-6 text-center">Cómo jugar</h1>
        <p className="pb-4">Adivina la palabra oculta en cinco intentos.</p>
        <p className="pb-4">
          Cada intento debe ser una palabra válida de 5 letras.
        </p>
        <p className="pb-4">
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>

        <p className="font-semibold pb-4">Ejemplos</p>
        <div className="flex gap-4 pb-3">
          {wordCorrect.map((item, index) => (
            <BoxWord
              key={index}
              word={item.word}
              status={item.status}
              color={item.color}
            />
          ))}
        </div>
        <p className="pb-4">
          La letra <strong>G</strong> está en la palabra y en la posición
          correcta.
        </p>

        <div className="flex gap-4 pb-3">
          {wordIncorrect.map((item, index) => (
            <BoxWord
              key={index}
              word={item.word}
              status={item.status}
              color={item.color}
            />
          ))}
        </div>
        <p className="pb-4">
          La letra <strong>C</strong> está en la palabra pero en la posición
          incorrecta.
        </p>

        <div className="flex gap-4 pb-3">
          {wordNotfound.map((item, index) => (
            <BoxWord
              key={index}
              word={item.word}
              status={item.status}
              color={item.color}
            />
          ))}
        </div>
        <p className="pb-4">
          La letra <strong>O</strong> no está en la palabra.
        </p>
        <p className="pt-4 pb-8">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
        <p className="pb-8 text-center">¡Una palabra nueva cada 5 minutos!</p>

        {!hiddenButton && (
          <div className="text-center">
            <button
              type="button"
              onClick={onStartGame}
              className="inline-flex justify-center rounded-md bg-green-600 px-16 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-500"
            >
              !JUGAR¡
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;
