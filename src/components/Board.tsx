import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { initTiles, setCurrentId, setGameOver, setTileStatus } from '../state/slices/gameSlice';
import { STATUS } from '../utils/consts';
import { ITile } from '../utils/interfaces';
import Tile from './Tile';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { tiles, mines, currentId, isGameOver } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    dispatch(initTiles());
  }, [dispatch]);
  
  const onClickTile = (id: number) => {
    dispatch(setTileStatus({id, status: STATUS.CLICKED}));
    dispatch(setCurrentId(id));
  }

  useEffect(() => {
    if (mines.includes(currentId)) {
      setTimeout(() => {
        tiles.map((tile) => {
          if (tile.status === STATUS.DEFAULT) {
            dispatch(setTileStatus({id: tile.id, status: STATUS.NON_CLICKED}));
          }
        });
      }, 1000);
    }
    dispatch(setGameOver());
  }, [tiles, currentId]);

  return (
    <>
      <div className="flex justify-center grid grid-rows-5 grid-flow-col gap-2 py-12 bg-board-primary">
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