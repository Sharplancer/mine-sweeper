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
          [STATUS.DEFAULT]: <button type="button" className="bg-tile-primary hover:bg-tile-hover top-0 hover:translate-y-tile-hover focus:translate-y-0 rounded-lg shadow-tile hover:duration-200 focus:animate-tile-focus w-28 h-28 mb-1" onClick={onTileClick}></button>,
          [STATUS.CLICKED]: {
            [TYPE.GEM]: <div className="flex justify-center items-center bg-title-secondary w-28 h-28 rounded-lg mb-1"><img className="w-20 h-20 animate-icon-appear" src={Gem}/></div>,
            [TYPE.MINE]: (
              <div className="flex justify-center items-center bg-title-secondary w-28 h-28 rounded-lg mb-1">
                <img className="absolute w-40 h-40 animate-icon-appear" src={Explosion}/>
                <img className="absolute w-20 h-20 animate-icon-appear" src={Mine}/>
              </div>),
          } [type],
          [STATUS.NON_CLICKED]: (
            <div className="flex justify-center items-center bg-title-secondary w-28 h-28 rounded-lg mb-1">
              <img className="absolute w-14 h-14 animate-icon-appear opacity-50" src={type === TYPE.GEM ? Gem : Mine}/>
            </div>),
        } [status]
      }
    </>
  )
}

export default Tile;