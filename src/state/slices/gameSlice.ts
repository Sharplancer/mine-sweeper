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
    tiles: [] as ITile[],
    mines: [] as number[],
  },
  reducers: {
    initTiles(state) {
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

    setMinesCount(state, action) {
      state.minesCount = action.payload;
      this.initTiles(state);
    },

    setStatus(state, action) {
      state.tiles[action.payload.id].status = action.payload.status;
    }
  }
})

export const {
  initTiles,
  setMinesCount,
  setStatus,
} = gameSlice.actions
export default gameSlice.reducer
