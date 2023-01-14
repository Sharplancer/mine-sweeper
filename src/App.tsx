import React from 'react';
import './App.css';
import Tile from './components/Tile';

function App() {
  return (
    <>
      <div className="grid-rows-5">
        {
          <Tile />
        }
      </div>
    </>
  );
}

export default App;
