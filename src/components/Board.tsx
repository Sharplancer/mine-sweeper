import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { initTiles, setStatus } from '../state/slices/gameSlice';
import { STATUS } from '../utils/consts';
import { ITile } from '../utils/interfaces';
import Tile from './Tile';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState) => state.game.tiles);
  const mines = useSelector((state: RootState) => state.game.mines);
  const [currentId, setCurrentId] = useState<number>(0);

  useEffect(() => {
    dispatch(initTiles());
  }, [dispatch]);
  
  const onClickTile = (id: number) => {
    setTimeout(() => {
      dispatch(setStatus({id, status: STATUS.CLICKED}));
      setCurrentId(id);
    }, 1000);
  }

  useEffect(() => {
    if (mines.includes(currentId)) {
      tiles.map((tile) => {
        if (tile.status === STATUS.DEFAULT) {
          console.log(tile.id);
          dispatch(setStatus({id: tile.id, status: STATUS.NON_CLICKED}));
        }
      });
    }
  }, [tiles, currentId])

  return (
    <>
      <div className="flex justify-center grid grid-rows-5 grid-flow-col gap-1">
        {
          tiles.map((tile: ITile) => (
            <Tile
              key={tile.id}
              id={tile.id}
              type={tile.type}
              status={tile.status}
              onClick={onClickTile}
            />
          ))
        }
      </div>
    </>
  )
}

export default Board;