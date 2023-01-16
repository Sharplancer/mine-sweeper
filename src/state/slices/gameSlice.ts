import { createSlice } from '@reduxjs/toolkit'
import { setMaxListeners } from 'events';
import { STATUS, TYPE } from '../../utils/consts';
import { randomIndex } from '../../utils/formulas';
import { ITile } from '../../utils/interfaces';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    tilesCount: 25,
    minesCount: 3,
    currentId: -1,
    tiles: [] as ITile[],
    mines: [] as number[],
    isGameOver: false,
    gemsCount: 0,
    totalProfit: 0,
    cashOut: false,
    isStarted: false,
  },
  reducers: {
    initTiles(state) {
      state.minesCount = 3;
      state.currentId = -1;
      state.gemsCount = 0;
      state.isGameOver = false;
      state.cashOut = false;
      state.isStarted = false;
      state.tiles = [];
      for (let i = 0; i < state.tilesCount; i++) {
        state.tiles.push({
          id: i,
          type: TYPE.GEM,
          status: STATUS.DEFAULT
        });
      }

      state.mines = [];
      for (let i = 0; i < state.minesCount; i++) {
        let index = randomIndex(state.tilesCount);
        while (state.mines.includes(index)) {
          index = randomIndex(state.tilesCount);
        }
        state.mines.push(index);
        state.tiles[index].type = TYPE.MINE;
      }
    },

    setCurrentId(state, action) {
      state.currentId = action.payload;
    },

    setMinesCount(state, action) {
      state.currentId = -1;
      state.isGameOver = false;
      state.gemsCount = 0;
      state.cashOut = false;
      state.isStarted = true;
      state.minesCount = action.payload;
      state.tiles = [];
      for (let i = 0; i < state.tilesCount; i++) {
        state.tiles.push({
          id: i,
          type: TYPE.GEM,
          status: STATUS.DEFAULT
        });
      }

      state.mines = [];
      for (let i = 0; i < state.minesCount; i++) {
        let index = randomIndex(state.tilesCount);
        while (state.mines.includes(index)) {
          index = randomIndex(state.tilesCount);
        }
        state.mines.push(index);
        state.tiles[index].type = TYPE.MINE;
      }
    },

    setTileStatus(state, action) {
      state.tiles[action.payload.id].status = action.payload.status;
    },

    setGameOver(state) {
      state.isGameOver = state.tiles.every(el => el.status != STATUS.DEFAULT);
      state.gemsCount = state.tiles.filter(el => el.status === STATUS.CLICKED && el.type === TYPE.GEM).length;
      if (state.isGameOver)
        state.isStarted = false;
    },

    setTotalProfit(state, action) {
      state.totalProfit = action.payload;
    },

    setCashOut(state) {
      state.cashOut = true;
      state.isStarted = false;
    },
  }
})

export const {
  initTiles,
  setCurrentId,
  setMinesCount,
  setTileStatus,
  setGameOver,
  setTotalProfit,
  setCashOut,
} = gameSlice.actions
export default gameSlice.reducer
