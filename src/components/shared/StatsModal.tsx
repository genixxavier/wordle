import React from 'react';
import { IPlayer } from '../interfaces/PlayerInterface';

interface StatsModalProps {
  dataplayer: IPlayer;
  word?: string;
  closeModal: () => void;
  incorrect: boolean,
  datetime: string
}

const StatsModal: React.FC<StatsModalProps> = ({ datetime, dataplayer, incorrect = false, word, closeModal }) => {

  return (
    <div className='text-center'>
      <h2 className='font-bold text-2xl'>Estadísticas</h2>
      <div className='flex justify-between px-4 py-6'>
        <div className='text-center'>
          <h3 className='font-bold text-2xl'>{dataplayer.played}</h3>
          <p>Jugadas</p>
        </div>
        <div className='text-center'>
          <h3 className='font-bold text-2xl'>{dataplayer.winer}</h3>
          <p>Victorias</p>
        </div>
      </div>
      <div className='pb-6'>
        { incorrect && (
          <p className='pb-6'>La palabra era: <strong>{word}</strong></p>
        )}
        <p>SIGUIENTE PALABRA</p>
        <p className='font-bold'>{datetime}</p>
      </div>
      <div className="text-center">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex justify-center rounded-md bg-green-600 px-16 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-500"
            >Aceptar</button>
          </div>
    </div>
  );
};

export default StatsModal;
