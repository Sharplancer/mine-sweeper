import { useState } from 'react';
import Gem from '../assets/gem.svg';
import Mine from '../assets/mine.svg';
import Explosion from '../assets/explosion.gif';
import { STATUS, TYPE } from '../utils/consts';

interface IProps {
  id: number,
  type: TYPE,
  status: STATUS,
  onClick: (index: number) => void,
}

const Tile: React.FC<IProps> = (props) => {
  const { id, type, status, onClick } = props;

  const onTileClick = () => {
    onClick(id);
  }

  return (
    <>
      {
        {
          [STATUS.DEFAULT]: <button type="button" className="bg-tile-primary hover:bg-tile-hover top-0 hover:translate-y-tile-hover active:translate-y-0 rounded-lg shadow-tile hover:duration-200 select-none animate-fast-out md:w-28 md:h-28 sm:w-20 sm:h-20 w-16 h-16 mb-2" onClick={onTileClick}></button>,
          [STATUS.CLICKED]: {
            [TYPE.GEM]: <button className="flex justify-center items-center bg-title-secondary select-none md:w-28 md:h-28 sm:w-20 sm:h-20 w-16 h-16 rounded-lg animate-out-in mb-2">
                <img className="md:w-20 md:h-20 sm:w-16 sm:h-16 w-12 h-12 animate-out active:scale-95" src={Gem}/>
              </button>,
            [TYPE.MINE]: (
              <button className="flex justify-center items-center bg-title-secondary select-none md:w-28 md:h-28 sm:w-20 sm:h-20 w-16 h-16 active:children:scale-75 rounded-lg animate-out-in mb-2">
                <img className="absolute md:w-40 md:h-40 sm:w-36 sm:h-36 w-32 h-32 animate-out active:scale-95" src={Explosion}/>
                <img className="absolute md:w-20 md:h-20 sm:w-16 sm:h-16 w-12 h-12 animate-out active:scale-95" src={Mine}/>
              </button>),
          } [type],
          [STATUS.NON_CLICKED]: (
            <button className="flex justify-center items-center bg-title-secondary select-none md:w-28 md:h-28 sm:w-20 sm:h-20 w-16 h-16 rounded-lg mb-2">
              <img className="absolute md:w-14 md:h-14 sm:w-10 sm:h-10 w-8 h-8 animate-fast-out opacity-50" src={type === TYPE.GEM ? Gem : Mine}/>
            </button>),
        } [status]
      }
    </>
  )
}

export default Tile;