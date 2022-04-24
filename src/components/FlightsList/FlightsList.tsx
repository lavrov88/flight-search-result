import React from "react";
import { FlightsListProps } from "../../types";
import FlightListItem from "./FlightListItem/FlightsListItem"
import './FlightsList.css'

const FlightsList = ({ flights }: FlightsListProps) => {
  let keyCount = 0
  const getKey = () => 'key_' + keyCount++

  const [length, setLength] = React.useState(2)
  let clippedFlights = flights.slice(0, length)

  React.useEffect(() => {
    setLength(2)
  }, [flights])

  const showMoreHandler = () => {
    setLength(length + 2 < flights.length ? length + 2 : flights.length)
  }

  return (
    <main className="flightlist_wrapper">
      {!!flights.length && <>
        <ul>
          {clippedFlights.map(f => {
            return (
              <FlightListItem 
                key={getKey()}
                airlineLogo={f.carrier.caption} 
                price={f.price} 
                leg1={{
                  airlineName: f.carrier.caption,
                  arrival: {
                    city: f.legs[0].arrivalCity,
                    airportName: f.legs[0].arrivalAirport.caption,
                    airportUid: f.legs[0].arrivalAirport.uid,
                    date: f.legs[0].arrivalDate
                  },
                  departure: {
                    city: f.legs[0].departureCity,
                    airportName: f.legs[0].departureAirport.caption,
                    airportUid: f.legs[0].departureAirport.uid,
                    date: f.legs[0].departureDate
                  },
                  segments: f.legs[0].segments,
                  travelTime: f.legs[0].travelTime
                }} 
                leg2={{
                  airlineName: f.carrier.caption,
                  arrival: {
                    city: f.legs[1].arrivalCity,
                    airportName: f.legs[1].arrivalAirport.caption,
                    airportUid: f.legs[1].arrivalAirport.uid,
                    date: f.legs[1].arrivalDate
                  },
                  departure: {
                    city: f.legs[1].departureCity,
                    airportName: f.legs[1].departureAirport.caption,
                    airportUid: f.legs[1].departureAirport.uid,
                    date: f.legs[1].departureDate
                  },
                  segments: f.legs[1].segments,
                  travelTime: f.legs[1].travelTime
                }}
              />
            )
          })}
        </ul>
      {clippedFlights.length !== flights.length && <div className="fligthlist_footer">
        <button className="show_more_btn" onClick={showMoreHandler}>Показать еще</button>
      </div>}
      </>}

      {!flights.length && 
      <div className="flightlist_empty">
        К сожалению, не нашлось рейсов, подходящих под ваши параметры...
      </div>}
    </main>
  )
}

export default FlightsList