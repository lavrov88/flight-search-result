import getDataFromJSON from '../common/getDataFromJSON'
import flightsJSON from '../assets/data/flights.json'
import { AllActions, FilterAndSortData, SortVariants } from '../types'
import { filterAndSort, getAllAirlines } from '../common/tools'

const allFligths = getDataFromJSON(flightsJSON)
const allAirlines = getAllAirlines(allFligths)

const initialState = {
  allFligths: allFligths,
  processedFlights: [...allFligths].sort((a,b) => a.price - b.price),
  searchOptions: {
    sortBy: 'price_increase' as SortVariants,
    segmentsFilter: {
      transfer_0: {
        isChecked: false,
        isActive: true
      },
      transfer_1: {
        isChecked: false,
        isActive: true
      }
    },
    priceFilter: {
      priceFrom: 0,
      priceTo: 1000000
    },
    airlineFilter: [...allAirlines.map(a => {
      return {
        name: a,
        isChecked: false,
        isActive: true,
        cheapestFlight: [...allFligths
                         .filter(f => f.carrier.caption === a)
                         .sort((a,b) => a.price - b.price)][0].price
      }
    })].sort((a,b) => a.cheapestFlight - b.cheapestFlight)
  }
}
export type AppStateType = typeof initialState

const appReducer = (state: AppStateType = initialState, action: AllActions) => {
  switch (action.type) {
    case 'PROCESS_FLIGHT_LIST':

      const dataObj: FilterAndSortData = {
        segmentsFilter: state.searchOptions.segmentsFilter,
        priceFilter: state.searchOptions.priceFilter,
        airlineFilter: state.searchOptions.airlineFilter,
        sortBy: state.searchOptions.sortBy
      }

      // UPDATE FLIGHT LIST
      const processedFlights = filterAndSort([...state.allFligths], dataObj, 
                                            { segmentsFilter: true, 
                                              priceFilter: true, 
                                              airlineFilter: true, 
                                              sortBy: true })


      // UPDATE AIRLINE FILTER AVAILABLE OPTIONS
      const flightsWithoutAirlineFilter = filterAndSort([...state.allFligths], dataObj, 
                                                        { segmentsFilter: true, 
                                                          priceFilter: true })

      let processedAirlineFilter = [...state.searchOptions.airlineFilter]
      processedAirlineFilter = processedAirlineFilter.map(a => ({
        ...a,
        isActive: !!flightsWithoutAirlineFilter.find(f => (f.carrier.caption === a.name) 
                                                      && (f.price > state.searchOptions.priceFilter.priceFrom)
                                                      && (f.price < state.searchOptions.priceFilter.priceTo))
      }))


      // UPDATE SEGMENTS FILTER AVAILABLE OPTIONS
      let flightsWithoutSegmentFilter = filterAndSort([...state.allFligths], dataObj, 
                                                  { priceFilter: true, airlineFilter: true })

      let processedSegmentsFilter = {
        ...state.searchOptions.segmentsFilter,
        transfer_0: {
          ...state.searchOptions.segmentsFilter.transfer_0,
          isActive: !!flightsWithoutSegmentFilter.find(f => (f.legs[0].segments === 1)
                                                        && (f.legs[1].segments === 1)
                                                        && (f.price > state.searchOptions.priceFilter.priceFrom)
                                                        && (f.price < state.searchOptions.priceFilter.priceTo))
        }
      }

      return {
        ...state,
        processedFlights,
        searchOptions: {
          ...state.searchOptions,
          airlineFilter: [...processedAirlineFilter],
          segmentsFilter: {...processedSegmentsFilter}
        }
      }

    case 'CHANGE_FLIGHT_LIST_SORTING':
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          sortBy: action.payload
        }
      }

    case 'SET_TRANSFER_FILTER': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          segmentsFilter: {
            ...state.searchOptions.segmentsFilter,
            [action.payload]: {
              ...state.searchOptions.segmentsFilter[action.payload],
              isChecked: !state.searchOptions.segmentsFilter[action.payload].isChecked
            }
          }
        }
      }
    }

    case 'CHANGE_PRICE_RANGE':
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          priceFilter: {
            ...state.searchOptions.priceFilter,
            [action.payload.priceType]: action.payload.value
          }
        }
      }

    case 'CHANGE_AIRLINES_FILTER': 
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          airlineFilter: [
            ...state.searchOptions.airlineFilter.map(a => {
              if (a.name !== action.payload) return a
              return { ...a, isChecked: !a.isChecked }
            })
          ]
        }
      }
  
    default:
      return state
  }
}

export default appReducer
