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
  },
  reducers: {
    initTiles(state) {
      state.minesCount = 3;
      state.currentId = -1;
      state.isGameOver = false;
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
      state.isGameOver = state.tiles.every(el => el.status != STATUS.DEFAULT)
    },
  }
})

export const {
  initTiles,
  setCurrentId,
  setMinesCount,
  setTileStatus,
  setGameOver,
} = gameSlice.actions
export default gameSlice.reducer
