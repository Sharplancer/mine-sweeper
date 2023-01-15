import React from 'react';
import './App.css';
import Board from './components/Board';
import Settings from './components/Settings';
import Tile from './components/Tile';

function App() {
  return (
    <>
      <div className="grid grid-cols-3">
        <Settings />
        <div className="col-span-2">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
