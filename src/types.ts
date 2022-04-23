// DATA TYPES 

import { AppStateType } from "./redux/appReducer"

export type FlightLeg = {
  segments: number
  travelTime: number
  departureDate: number
  departureAirport: { uid: string, caption: string }
  departureCity: string
  arrivalDate: number
  arrivalAirport: { uid: string, caption: string }
  arrivalCity: string
}

export type FlightDataObject = {
  bothSidesTravelTime: number
  carrier: {
    airlineCode: string
    caption: string
  }
  legs: [FlightLeg, FlightLeg]
  price: number
}

// ACTIONS TYPES

export type AllActions = SortFlightListAction

export type SortFlightListAction = {
  type: 'SORT_FLIGHT_LIST'
  payload: SortVariants
}

export type SortVariants = 'price_increase'
                   | 'price_decrease'
                   | 'travel_time'

// PROPS TYPES

export type AirlineItemProps = {
  name: string
}

export type SearchOptionsProps = {
  app: AppStateType
}

export type FlightsListProps = {
  flights: FlightDataObject[]
}

export type FlightListItemProps = {
  airlineLogo: string
  price: number
  leg1: FlightLegProps
  leg2: FlightLegProps
}

export type FlightLegProps = {
  airlineName: string
  arrival: FlightDepartureAndArrivalProps
  departure: FlightDepartureAndArrivalProps
  segments: number
  travelTime: number
}

type FlightDepartureAndArrivalProps = {
  city: string
  airportName: string
  airportUid: string
  date: number
}