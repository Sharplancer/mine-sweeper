import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'

const reducer = combineReducers({
  game: gameReducer,
})

export const store = configureStore({
  reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
