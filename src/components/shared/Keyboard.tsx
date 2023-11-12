import React, { useContext, useEffect, useState } from "react";
import { IBoxWord } from "../interfaces/BoxWordInterface";
import BoxWord from "./BoxWord";
import { wordslist } from "../../../src/data/datawords";
import StatsModal from "./StatsModal";
import { IPlayer } from "../interfaces/PlayerInterface";
import { AppStateContext } from "../../context/AppContext";

interface KeyboardProps {
  setWords: React.Dispatch<React.SetStateAction<IBoxWord[][]>>;
  setResetwords: React.Dispatch<React.SetStateAction<boolean>>;
  words: IBoxWord[][];
}

const getRandomWord = (length: number): string => {
  const filterListWord = wordslist.filter((w: any) => w.length === length);
  const indiceAleatorio = Math.floor(Math.random() * filterListWord.length);
  return filterListWord[indiceAleatorio].toUpperCase();
};

const Keyboard: React.FC<KeyboardProps> = ({ setWords, words, setResetwords }) => {
  const { state: { openModalEstadistica, listKeysbordInit }, actions:{setOpenModalEstadistica} } = useContext(AppStateContext);

  const [columna, setColumna] = useState(0);
  const [fila, setFila] = useState(0);
  const [wordSelected, setWordSelected] = useState<string>(getRandomWord(5));
  const [listKeysbord, setListKeysbord] = useState<IBoxWord[][]>(listKeysbordInit);
  const [modalClass, setModalClass] = useState('hidden');
  const [dataplayer, setDataplayer] = useState<IPlayer>({played: 0, winer: 0});
  const [incorrect, setIncorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(5 * 60);

  const handleButtonClick = (value: string) => {
    handleKeyPress({ key: value } as KeyboardEvent);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const validKeys = /^[a-zA-Z]$/;

    if (event.key.match(validKeys) || event.key === "Backspace" || event.key === "Enter") {
      const pressedKey = event.key.toUpperCase();

      if (event.key === "Backspace") {
        handleDelete();
      } else if (event.key === "Enter") {
        clickEnter();
      } else {
        handleLetterInput(pressedKey);
      }
    }
  };

  const handleLetterInput = (pressedKey: string) => {
    if (columna < 5) {
      setWords((prevWords) => {
        const newWords = prevWords.map((row, rowIndex) => {
          if (rowIndex === fila) {
            return row.map((cell, colIndex) => {
              if (colIndex === columna) {
                return { ...cell, word: pressedKey };
              } else {
                return cell;
              }
            });
          } else {
            return row;
          }
        });

        return newWords;
      });

      setColumna((prevColumna) => prevColumna + 1);
    }
  };

  const handleDelete = () => {
    if (columna > 0) {
      setColumna((prevColumna) => prevColumna - 1);
      setWords((prevWords) => {
        const newWords = prevWords.map((row, rowIndex) => {
          if (rowIndex === fila) {
            return row.map((cell, colIndex) => {
              if (colIndex === columna - 1) {
                return { ...cell, word: "" };
              } else {
                return cell;
              }
            });
          } else {
            return row;
          }
        });

        return newWords;
      });
    }
  };

  const clickEnter = () => {
    if (columna === 5 && fila <= 4) {
      setColumna(0);
      setFila((prevFila) => prevFila + 1);
      checkWord();
    }
  };

  const checkWord = () => {
    const letras = words[fila].map((objeto) => objeto.word);
    const palabraCompleta = letras.join('');

    if (palabraCompleta === wordSelected) {
      const newPlayed = dataplayer.played + 1
      const newWiner = dataplayer.winer + 1
      setDataplayer({ played: newPlayed, winer: newWiner })
      openModal();
      localStorage.setItem('dataplayer', JSON.stringify({played: newPlayed, winer: newWiner}));
    } else {
      if(fila === 4){
        setTimeout(()=>{
          const newPlayed = dataplayer.played + 1
          setDataplayer({...dataplayer, played: newPlayed })
          setIncorrect(true)
          openModal()
          localStorage.setItem('dataplayer', JSON.stringify({played: newPlayed, winer: dataplayer.winer}));
        },800)
      }
    }

    setWords((prevWords) => {
      const newWords = prevWords.map((row, rowIndex) => {
        if (rowIndex === fila) {
          return row.map((cell, colIndex) => {
            const newStatus = determineStatus(cell.word, wordSelected, colIndex);
            updateListKeysbord(newStatus, cell.word);
            return { ...cell, status: newStatus };
          });
        } else {
          return row;
        }
      });

      return newWords;
    });
 }; 

  const updateListKeysbord = (status: string, word: string) => {
    setListKeysbord((prevListKeysbord) => {
      return prevListKeysbord.map((row) => {
        return row.map((cell) => {
          if (cell.word === word) {
            return { ...cell, status: status as "correct" | "incorrect" | "no-found" };
          } else {
            return cell;
          }
        });
      });
    });
  };

  const determineStatus = (
    pressedKey: string,
    wordSelected: string,
    columnIndex: number
  ): "correct" | "incorrect" | "no-found" => {
    if (pressedKey === wordSelected[columnIndex]) {
      return "correct";
    } else if (wordSelected.includes(pressedKey)) {
      return "incorrect";
    } else {
      return "no-found";
    }
  };

  const openModal = () => {
    setModalClass( 'fixed inset-0 flex items-center justify-center')
  };

  const closeModal = () => {
    setModalClass('hidden')
    setOpenModalEstadistica(false)
  };

  const selectWordReset = ():string => {
    const newWordSelect = getRandomWord(5);
    if (newWordSelect === wordSelected) {
      return selectWordReset();
    }
  
    return newWordSelect;
  };

  const resetGames = () => {
    setResetwords(true)
    setWordSelected(selectWordReset())
    setColumna(0)
    setFila(0)
    setListKeysbord(listKeysbordInit)
    setIncorrect(false)
    closeModal()
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
    return formattedTime;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [columna, fila]);

  useEffect(() => {
    console.log('wordSelected', wordSelected)
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));

      if (timeRemaining === 0) {
        resetGames()
        setTimeRemaining(1 * 60);
      }
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  useEffect(() => {
    if(openModalEstadistica){
      openModal()
    }
  }, [openModalEstadistica]);

  useEffect(() => {
    const getDataPlayer = localStorage.getItem('dataplayer');
    if(getDataPlayer){
      setDataplayer(JSON.parse(getDataPlayer))
    }
  }, []);

  return (
    <div>
    <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-900">
      {listKeysbord.map((wordGroup, groupIndex) => (
        <div
          key={groupIndex}
          className={`flex gap-4 pb-3 ${
            groupIndex === 0 ? "ml-4" : groupIndex === 1 ? "ml-8" : ""
          }`}
        >
          {wordGroup.map((item, index) => (
            <div key={item.word} onClick={() => handleButtonClick(item.word)}>
              <BoxWord
                key={index}
                word={item.word}
                status={item.status}
                type={"keyboard"}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className={`${modalClass} z-10`}>
        <div className="fixed inset-0 bg-white opacity-50 "></div>
        <div className="bg-white p-10 rounded-lg shadow-md z-20 w-[546px]">
          <button className="absolute top-2 right-2" onClick={closeModal}>
            <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <StatsModal dataplayer={dataplayer} datetime={formatTime(timeRemaining)} incorrect={incorrect} word={wordSelected} closeModal={closeModal}></StatsModal>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
