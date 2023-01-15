import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { initTiles, setCurrentId, setMinesCount, setTileStatus } from '../state/slices/gameSlice';
import { STATUS } from '../utils/consts';
import BombIcon from '../assets/bomb.png';
import DiamondIcon from '../assets/diamond.png';
import UsdIcon from '../assets/usd.png';
import { ITile } from '../utils/interfaces';
import Tile from './Tile';
import { randomIndex } from '../utils/formulas';

const usdToBtcRate = 0.000048;

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { tiles, tilesCount, isGameOver } = useSelector((state: RootState) => state.game);
  const [amount, setAmount] = useState<any>(0);
  const [mineCount, setMineCount] = useState<number>(3);
  const [isBeted, setBeted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(initTiles());
  }, [dispatch]);

  useEffect(() => {
    if (isBeted) {
      dispatch(setMinesCount(mineCount));
    }
  }, [isBeted]);

  useEffect(() => {
    if (isGameOver === true) {
      setAmount(0);
      setMineCount(3);
      setBeted(false);
    }
  }, [isGameOver]);

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value);
  }

  const onBlurAmount = () => {
    setAmount(amount.toFixed(2));
  }

  const halfAmount = () => {
    setAmount(amount as number / 2);
  }

  const doubleAmount = () => {
    setAmount(amount as number * 2);
  }

  const onChangeMinesCount = (e: any) => {
    setMineCount(e.target.value);
  }

  const onClickBet = () => {
    setBeted(true);
  }

  const pickRandomTile = () => {
    setLoading(true);
    let index = randomIndex(tilesCount);
    while(tiles[index].status === STATUS.CLICKED) {
      index = randomIndex(tilesCount);
    }
    dispatch(setTileStatus({ id: index, status: STATUS.CLICKED}));
    dispatch(setCurrentId(index));
    
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }

  const cashout = () => {
    setTimeout(() => {
      tiles.map((tile) => {
        if (tile.status === STATUS.DEFAULT) {
          dispatch(setTileStatus({id: tile.id, status: STATUS.NON_CLICKED}));
        }
      });
    }, 1000);
  }
  return (
    <>
      <div className="p-3 bg-board-secondary">
        <div className="flex justify-between items-end">
          <label className="block text-sm font-medium text-font-primary mb-1">Bet Amount</label>
          <label className="block text-xs font-medium text-font-primary mb-1">BTC {amount * usdToBtcRate}</label>
        </div>
        <div className="flex mb-3">
          <div className="relative w-full">
            <input
              type="number"
              className="bg-board-primary text-font-primary text-sm font-medium outline-none border-2 border-tile-primary rounded-l shadow-input hover:ring-input-border hover:border-input-border focus:ring-input-border focus:border-input-border focus:ring-input-border focus:border-input-border focus:text-white disabled:cursor-not-allowed duration-200 block w-full p-2.5 pr-8"
              step="0.01"
              value={amount}
              disabled={isBeted}
              onChange={onChangeAmount}
              onBlur={onBlurAmount}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <img className="w-4 h-4" src={UsdIcon} />
            </div>
          </div>
          <button
            type="submit"
            className={
              !isBeted
              ? "p-2.5 bg-tile-primary text-font-primary hover:bg-button-grey-hover hover:border-button-grey-hover hover:text-white text-sm active:text-xs font-medium outline-none border-tile-primary w-14 h-11 duration-200"
              : "p-2.5 bg-tile-primary text-font-primary text-sm font-medium outline-none border-tile-primary cursor-not-allowed w-14 h-11"
            }
            disabled={isBeted}
            onClick={halfAmount}
          >
            ½
          </button>
          <button
            type="submit"
            className={
              !isBeted
               ? "relative p-2.5 bg-tile-primary text-font-primary hover:bg-button-grey-hover hover:border-button-grey-hover hover:text-white text-sm active:text-xs font-medium outline-none border-t-2 border-b-2 border-tile-primary rounded-r after:absolute after:content-[''] after:left-[-1px] after:top-1/4 after:bottom-1/4 after:w-0.5 after:bg-board-primary w-14 h-11 duration-200"
               : "relative p-2.5 bg-tile-primary text-font-primary text-sm font-medium outline-none border-t-2 border-b-2 border-tile-primary cursor-not-allowed rounded-r after:absolute after:content-[''] after:left-[-1px] after:top-1/4 after:bottom-1/4 after:w-0.5 after:bg-board-primary w-14 h-11"
            }
            disabled={isBeted}
            onClick={doubleAmount}
          >
            2×
          </button>
        </div>

        {
          !isBeted ? <>
            <label className="block text-sm font-medium text-font-primary mb-1">Mines</label>
            <select
              className="bg-board-primary text-font-primary text-sm font-medium outline-none border-2 border-tile-primary rounded shadow-input hover:ring-input-border hover:border-input-border focus:ring-input-border focus:border-input-border focus:ring-input-border focus:border-input-border focus:text-white duration-200 block w-full p-2.5 mb-3"
              defaultValue={mineCount || 3}
              onChange={onChangeMinesCount}
            >
              {
                [...Array(tilesCount - 1)].map((_, i) => (
                  <option key={i} value={i+1}>{i+1}</option>
                ))
              }
            </select>
            <button
              className="bg-button-primary hover:bg-button-green-hover text-button-secondary text-sm active:text-xs font-medium rounded shadow-input duration-200 w-full h-14 p-2.5"
              onClick={onClickBet}
            >
              Bet
            </button>
          </> :
          <>
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-font-primary mb-1">Mines</label>
                <div className="relative mb-3">
                  <input
                    type="text"
                    className="bg-board-primary text-white text-sm font-medium outline-none border-2 border-tile-primary rounded shadow-input read-only:bg-tile-primary hover:ring-input-border hover:border-input-border focus:ring-input-border focus:border-input-border duration-200 block w-full p-2.5"
                    readOnly
                    value={mineCount}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <img className="w-5 h-5" src={BombIcon} />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-font-primary mb-1">Gems</label>
                <div className="relative mb-3">
                  <input
                    type="text"
                    className="bg-board-primary text-white text-sm font-medium outline-none border-2 border-tile-primary rounded shadow-input read-only:bg-tile-primary hover:ring-input-border hover:border-input-border focus:ring-input-border focus:border-input-border duration-200 block w-full p-2.5"
                    readOnly
                    value={tilesCount - mineCount}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <img className="w-4 h-4" src={DiamondIcon} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <label className="block text-sm font-medium text-font-primary mb-1">Total profit (1.00×)</label>
              <label className="block text-xs font-medium text-font-primary mb-1">$ {amount * usdToBtcRate}</label>
            </div>
            <div className="relative mb-3">
              <input
                type="text"
                className="bg-board-primary text-font-primary text-sm font-medium outline-none rounded border-2 border-tile-primary shadow-input read-only:bg-tile-primary hover:ring-input-border hover:border-input-border focus:ring-input-border focus:border-input-border duration-200 block w-full p-2.5"
                readOnly
                value={amount * (mineCount / tilesCount)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <img className="w-4 h-4" src={UsdIcon} />
              </div>
            </div>
            <button
              className={
                !isLoading ? 
                "bg-tile-primary text-font-primary hover:bg-button-grey-hover hover:text-white text-sm active:text-xs font-medium rounded shadow-input duration-200 w-full h-11 p-2.5 mb-3":
                "bg-tile-primary text-font-primary cursor-not-allowed text-sm font-medium rounded shadow-input w-full h-11 p-2.5 mb-3"
              }
              disabled={isLoading}
              onClick={pickRandomTile}
            >
              Pick random tile
            </button>
            <button
              className={
                !isLoading ?
                "bg-button-primary hover:bg-button-green-hover text-button-secondary text-sm active:text-xs font-medium rounded shadow-input duration-200 w-full h-14 p-2.5" : 
                "bg-button-primary text-button-secondary text-sm font-medium rounded shadow-input duration-200 w-full h-14 p-2.5"
              }
              disabled={isLoading}
              onClick={cashout}
            >
              {isLoading ? <img className="w-5 h-5 animation-rotate-out" src={BombIcon} /> : "Cashout"}
            </button>
          </>
        }
        </div>
    </>
  )
}

export default Settings;