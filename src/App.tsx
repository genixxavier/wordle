import React, { useState, useEffect } from 'react';
import Instructions from './components/Instructions';
import Board from './components/Board';
import './App.css';

const dataplayerDefault = {
  played: 0,
  winer: 0,
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<string>('light');
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [showBoard, setShowBoard] = useState<boolean>(false);

  const handleStartGame = () => {
    setShowInstructions(false);
    setShowBoard(true);
  };

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'true');
    } else{
      handleStartGame()
    }
  
    if(!localStorage.getItem('dataplayer')){
      localStorage.setItem('dataplayer', JSON.stringify(dataplayerDefault));
    }
  }, []);

  useEffect(() => {
    if(darkMode === 'dark'){
      document.querySelector('html')?.classList.add('dark')
    } else {
      document.querySelector('html')?.classList.remove('dark')
    }
  }, [darkMode])

  

  return (
    <div className="dark:bg-gray-800 h-screen">
      {showInstructions && (
        <Instructions onStartGame={handleStartGame} />
      )}
      {showBoard && (
        <Board setDarkMode={setDarkMode}/>
      )}
    </div>
  );
};

export default App;
