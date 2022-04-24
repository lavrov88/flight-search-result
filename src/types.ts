// DATA TYPES 

import { AppStateType } from "./redux/appReducer"
import { AppDispatch } from "./redux/store"

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

// FILTER AND SORT

export type FilterAndSortData = {
  segmentsFilter: SegmentsFilter
  priceFilter: PriceFilter
  airlineFilter: AirlineFilter
  sortBy: SortVariants
}

export type FilterAndSortSettings = {
  segmentsFilter?: boolean
  priceFilter?: boolean
  airlineFilter?: boolean
  sortBy?: boolean
}

export type SegmentsFilter = {
  transfer_0: TransferType,
  transfer_1: TransferType
}

type TransferType = {
  isChecked: boolean
  isActive: boolean
}

export type PriceFilter = {
  priceFrom: number
  priceTo: number
}

export type AirlineFilter = AirlineData[]

type AirlineData = {
  name: string
  isChecked: boolean
  isActive: boolean
  cheapestFlight: number
}

// ACTIONS TYPES

export type AllActions = ChangeFlightListSortingAction
                       | SetTransferFilterAction
                       | ProcessFlightListAction
                       | ChangePriceRangeAction
                       | ChangeAirlinesFilterAction

export type ChangeFlightListSortingAction = {
  type: 'CHANGE_FLIGHT_LIST_SORTING'
  payload: SortVariants
}

export type SortVariants = 'price_increase'
                   | 'price_decrease'
                   | 'travel_time'

export type SetTransferFilterAction = {
  type: 'SET_TRANSFER_FILTER'
  payload: TransferOption
}

export type TransferOption = 'transfer_0' | 'transfer_1'

export type ChangePriceRangeAction = {
  type: 'CHANGE_PRICE_RANGE'
  payload: {
    priceType: PriceType
    value: number
  }
}

export type ChangeAirlinesFilterAction = {
  type: 'CHANGE_AIRLINES_FILTER'
  payload: string
}

export type PriceType = 'priceFrom' | 'priceTo'

export type ProcessFlightListAction = {
  type: 'PROCESS_FLIGHT_LIST'
}


// PROPS TYPES

export type AirlineItemProps = {
  name: string
  isChecked: boolean
  isActive: boolean
  cheapestFlight: number
  dispatch: AppDispatch
}

export type SearchOptionsProps = {
  app: AppStateType
  dispatch: AppDispatch
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