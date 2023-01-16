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
          [STATUS.DEFAULT]: <button type="button" className="bg-tile-primary hover:bg-tile-hover top-0 hover:translate-y-tile-hover active:translate-y-0 rounded-lg shadow-tile hover:duration-200 select-none animate-fast-out w-28 h-28 mb-2" onClick={onTileClick}></button>,
          [STATUS.CLICKED]: {
            [TYPE.GEM]: <button className="flex justify-center items-center bg-title-secondary select-none w-28 h-28 rounded-lg animate-out-in mb-2">
                <img className="w-20 h-20 animate-out active:scale-95" src={Gem}/>
              </button>,
            [TYPE.MINE]: (
              <button className="flex justify-center items-center bg-title-secondary select-none w-28 h-28 active:children:scale-75 rounded-lg animate-out-in mb-2">
                <img className="absolute w-40 h-40 animate-out active:scale-95" src={Explosion}/>
                <img className="absolute w-20 h-20 animate-out active:scale-95" src={Mine}/>
              </button>),
          } [type],
          [STATUS.NON_CLICKED]: (
            <button className="flex justify-center items-center bg-title-secondary select-none w-28 h-28 rounded-lg mb-2">
              <img className="absolute w-14 h-14 animate-fast-out opacity-50" src={type === TYPE.GEM ? Gem : Mine}/>
            </button>),
        } [status]
      }
    </>
  )
}

export default Tile;