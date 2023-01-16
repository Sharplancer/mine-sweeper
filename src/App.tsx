import React from 'react';
import './App.css';
import Board from './components/Board';
import Settings from './components/Settings';
import Tile from './components/Tile';

function App() {
  return (
    <>
      <div className="flex w-full h-screen rounded-lg">
        <Settings />
        <Board />
      </div>
    </>
  );
}

export default App;
