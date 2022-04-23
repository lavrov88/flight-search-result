import React from 'react';
import './App.css';
import FlightsList from './components/FlightsList/FlightsList';
import SearchOptions from './components/SearchOptions/SearchOptions';
import { useAppSelector } from './redux/store';

function App() {
  const { app } = useAppSelector(s => s)

  return (
    <div className="App">
      <SearchOptions app={app} />
      <FlightsList flights={app.processedFlights} />
    </div>
  )
}

export default App;
