import getDataFromJSON from '../common/getDataFromJSON'
import flightsJSON from '../assets/data/flights.json'
import { AllActions } from '../types'
import { getAllAirlines } from '../common/tools'

const allFligths = getDataFromJSON(flightsJSON)
const allAirlines = getAllAirlines(allFligths)

const initialState = {
  allFligths: allFligths,
  processedFlights: allFligths,
  searchOptions: {
    sortBy: 'price_increase',
    segmentsFilter: null,
    priceFilter: {
      from: null,
      to: null
    },
    airlineFilter: [...allAirlines]
  }
}
export type AppStateType = typeof initialState

const appReducer = (state: AppStateType = initialState, action: AllActions) => {
  switch (action.type) {
    case 'SORT_FLIGHT_LIST':
      const sortedFlights = [...state.allFligths]
      const sortBy = action.payload
      if (action.payload === 'price_increase') {
        sortedFlights.sort((a,b) => a.price - b.price)
      }
      if (action.payload === 'price_decrease') {
        sortedFlights.sort((a,b) => b.price - a.price)
      }
      if (action.payload === 'travel_time') {
        sortedFlights.sort((a,b) => a.bothSidesTravelTime - b.bothSidesTravelTime)
      }

      return {
        ...state,
        processedFlights: sortedFlights,
        searchOptions: {
          ...state.searchOptions,
          sortBy
        }
      }
  
    default:
      break;
  }
  return state
}

export default appReducer
