import React from 'react';
import './App.css';
import './AppMobile.css';
import FlightsList from './components/FlightsList/FlightsList';
import SearchOptions from './components/SearchOptions/SearchOptions';
import { useAppDispatch, useAppSelector } from './redux/store';

function App() {
  const { app } = useAppSelector(store => store)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <SearchOptions app={app} dispatch={dispatch} />
      <FlightsList flights={app.processedFlights} />
    </div>
  )
}

export default App;
