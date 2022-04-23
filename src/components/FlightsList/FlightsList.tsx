import React from "react";
import styled from "styled-components";
import { FlightsListProps } from "../../types";
import FlightListItem from "./FlightListItem/FlightsListItem"

const FlightsListWrapper = styled.main`
  flex-grow: 1;

  padding: 10px;
`

const FlightsList = ({ flights }: FlightsListProps) => {  

  let keyCount = 0
  const getKey = () => 'key_' + keyCount++

  return (
    <FlightsListWrapper>
      <ul>

        {flights.map(f => {
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

        {/* <FlightListItem /> */}
      </ul>
    </FlightsListWrapper>
  )
}

export default FlightsList