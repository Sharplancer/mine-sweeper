import { useState } from 'react';
import Gem from '../assets/gem.svg';
import Mine from '../assets/mine.svg';
import Explosion from '../assets/explosion.gif';

enum STATUS {
  NORMAL = 'NORMAL',
  CLICKED = 'OPENED',
  NON_CLICKED = 'NON_CLICKED'
}

enum TYPE {
  GEM = 'GEM',
  MINE = 'MINE',
}

const Tile: React.FC = () => {
  const [type, setType] = useState<TYPE>(TYPE.MINE);
  const [status, setStatus] = useState<STATUS>(STATUS.NORMAL);

  const onClick = () => {
    waintAndSetStatus(STATUS.CLICKED);
  }

  const waintAndSetStatus = (mStatus: STATUS) => {
    setTimeout(() => {
      setStatus(mStatus);
    }, 1000)
  }
  
  return (
    <>
      {
        {
          [STATUS.NORMAL]: <button type="button" className="bg-tile-primary hover:bg-tile-hover top-0 hover:translate-y-tile-hover focus:translate-y-0 rounded-lg shadow-tile hover:duration-200 focus:animate-tile-focus px-5 py-2.5 mr-2 mb-2 w-28 h-28" onClick={onClick}></button>,
          [STATUS.CLICKED]: {
            [TYPE.GEM]: <div className="flex justify-center items-center bg-title-secondary w-28 h-28 rounded-lg"><img className="w-20 h-20 animate-icon-appear" src={Gem}/></div>,
            [TYPE.MINE]: (
              <div className="flex justify-center items-center bg-title-secondary w-28 h-28 rounded-lg">
                <img className="absolute w-40 h-40 animate-icon-appear" src={Explosion}/>
                <img className="absolute w-20 h-20 animate-icon-appear" src={Mine}/>
              </div>
            ),
          } [type],
          [STATUS.NON_CLICKED]: <div className="flex justify-center items-center bg-title-secondary w-28 h-28 rounded-lg"><img className="w-16 h-16 animate-icon-appear" src={type === TYPE.GEM ? Gem : Mine}/></div>,
        } [status]
      }
    </>
  )
}

export default Tile;