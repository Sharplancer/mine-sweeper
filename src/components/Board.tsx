import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { initTiles, setCurrentId, setGameOver, setTileStatus } from '../state/slices/gameSlice';
import { STATUS } from '../utils/consts';
import { UsdIcon } from '../utils/icons';
import { ITile } from '../utils/interfaces';
import Tile from './Tile';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { tiles, mines, currentId, gemsCount, tilesCount, totalProfit, cashOut, isStarted } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    dispatch(initTiles());
  }, [dispatch]);
  
  const onClickTile = (id: number) => {
    if (isStarted) {
      dispatch(setTileStatus({id, status: STATUS.CLICKED}));
      dispatch(setCurrentId(id));
    }
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
    <div className="flex justify-center items-center bg-board-primary w-full h-full">
      <div className="flex justify-center grid grid-rows-5 grid-flow-col gap-2 w-full">
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
      {
        cashOut && (
          <div className="absolute flex justify-center items-center flex-col bg-board-secondary border-[3px] border-button-primary rounded-md animate-appear select-none pt-3.5 pb-3.5 pl-8 pr-8">
            <span className="text-button-primary text-2xl font-medium">{(gemsCount / tilesCount).toFixed(2)}×</span>
            <div className="bg-tile-primary w-1/2 h-[3px] mt-2 mb-2" />
            <div className="flex justify-center items-center">
              <span className="text-button-primary text-sm font-medium mr-1">{totalProfit.toFixed(2)}</span>
              <img className="w-4 h-4" src={UsdIcon} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Board;