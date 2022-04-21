import React from 'react';
import './App.css';
import FlightsList from './components/FlightsList/FlightsList';
import SearchOptions from './components/SearchOptions/SearchOptions';

function App() {
  return (
    <div className="App">
      <SearchOptions />
      <FlightsList />
    </div>
  )
}

export default App;
