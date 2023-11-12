import { ReactNode, createContext, useState } from 'react';
import { IBoxWord } from '../components/interfaces/BoxWordInterface';

interface AppState {
  openModalEstadistica: boolean;
  listKeysbordInit: IBoxWord[][]
}

interface AppStateProviderProps {
  children: ReactNode;
}

interface AppStateContextType {
  state: AppState;
  actions: {
    setOpenModalEstadistica: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const listKeysbordInit: IBoxWord[][] = [
  [
    { word: "Q"},
    { word: "W" },
    { word: "E" },
    { word: "R" },
    { word: "T" },
    { word: "Y" },
    { word: "U" },
    { word: "I" },
    { word: "O" },
    { word: "P" },
  ],
  [
    { word: "A" },
    { word: "S" },
    { word: "D" },
    { word: "F" },
    { word: "G" },
    { word: "H" },
    { word: "J" },
    { word: "K" },
    { word: "L" },
  ],
  [
    { word: "Enter" },
    { word: "Z" },
    { word: "X" },
    { word: "C" },
    { word: "V" },
    { word: "B" },
    { word: "N" },
    { word: "M" },
    { word: "Backspace" },
  ],
];

const initialState: AppState = {
  openModalEstadistica: false,
  listKeysbordInit: listKeysbordInit
};

export const AppStateContext = createContext<AppStateContextType>({
  state: initialState,
  actions: {
    setOpenModalEstadistica: () => {},
  },
});

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [openModalEstadistica, setOpenModalEstadistica] = useState(false);

  const contextValue: AppStateContextType = {
    state: {
      openModalEstadistica,
      listKeysbordInit
    },
    actions: {
      setOpenModalEstadistica,
    },
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
