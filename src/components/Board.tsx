import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import BoxWord from "./shared/BoxWord";
import Keyboard from "./shared/Keyboard";
import { IBoxWord } from "./interfaces/BoxWordInterface";

interface BoardProps {
  setDarkMode : React.Dispatch<React.SetStateAction<string>>;
}

const generateArray = () => {
  const array = []
  let lineWord: IBoxWord[] = [
    { word: "", status: "without-word" },
    { word: "", status: "without-word" },
    { word: "", status: "without-word" },
    { word: "", status: "without-word" },
    { word: "", status: "without-word" },
  ];

  for (let index = 0; index < 5; index++) {
    array.push(lineWord)
  }

  return array
}

const Board: React.FC<BoardProps> = ({ setDarkMode }) => {
  const [words, setWords] = useState<IBoxWord[][]>(generateArray);
  const [resetwords, setResetwords] = useState<boolean>(false);

  useEffect(( )=> {
    if(resetwords){
      setWords(generateArray)
      setResetwords(false)
    }
  },[resetwords])

  return (
    <div className="w-[638px] mx-auto py-10">
      <Header setDarkMode={setDarkMode}></Header>
      <div className="text-center py-12 ">
      <div className="inline-block">
          {words.map((wordGroup, groupIndex) => (
            <div key={groupIndex} className="flex gap-4 pb-3">
              {wordGroup.map((item, index) => (
                <BoxWord key={'ss'+index} word={item.word} status={item.status} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Keyboard setWords={setWords} words={words} setResetwords={setResetwords}></Keyboard>
    </div>
  );
};

export default Board;
