// DATA EXTRACT

import { AirlineFilter, FilterAndSortData, FilterAndSortSettings, FlightDataObject, PriceFilter, SegmentsFilter, SortVariants } from "../types"

export const getAllAirlines = (flights: FlightDataObject[]) => {
  const setData =  new Set(flights.map(f => f.carrier.caption)) 
  const arrData: string[] = []
  setData.forEach(airline => arrData.push(airline))
  return arrData
}


// DATA PROCESSING

export const filterBySegments = (inputFlights: FlightDataObject[], segmentsFilter: SegmentsFilter) => {
  const { transfer_0, transfer_1 } = segmentsFilter
  if (transfer_0.isChecked && !transfer_1.isChecked) {
    return inputFlights.filter(f => {
      return f.legs[0].segments === 1 && f.legs[1].segments === 1
    })
  }
  if (!transfer_0.isChecked && transfer_1.isChecked) {
    return inputFlights.filter(f => {
      return f.legs[0].segments === 2 && f.legs[1].segments === 2
    })
  }
  return inputFlights
}


export const filterByPriceRange = (inputFlights: FlightDataObject[], priceFilter: PriceFilter) => {
  const { priceFrom, priceTo } = priceFilter
  return inputFlights.filter(f => {
    return f.price >= priceFrom && f.price <= priceTo
  })
}


export const filterByAirline = (inputFlights: FlightDataObject[], airlineFilter: AirlineFilter) => {
  const checkedAirlines = [...airlineFilter].filter(a => a.isChecked)
  if (checkedAirlines.length !== 0 && checkedAirlines.length !== airlineFilter.length) {
    return inputFlights.filter(f => {
      return checkedAirlines.findIndex(a => a.name === f.carrier.caption) !== -1
    })
  }
  return inputFlights
}

export const sortFlights = (inputFlights: FlightDataObject[], sortBy: SortVariants) => {
  switch (sortBy) {
    case 'price_increase':
      return inputFlights.sort((a,b) => a.price - b.price)

    case 'price_decrease':
      return inputFlights.sort((a,b) => b.price - a.price)
      
    case 'travel_time':
      return inputFlights.sort((a,b) => a.bothSidesTravelTime - b.bothSidesTravelTime)
    
    default:
      return inputFlights
  }
}

export const filterAndSort = (inputFlights: FlightDataObject[], 
                              dataObj: FilterAndSortData,
                              settingsObj: FilterAndSortSettings) => {
  let flights = [...inputFlights]

  if (settingsObj.segmentsFilter) {
    flights = filterBySegments(flights, dataObj.segmentsFilter)
  }
  if (settingsObj.priceFilter) {
    flights = filterByPriceRange(flights, dataObj.priceFilter)
  }
  if (settingsObj.airlineFilter) {
    flights = filterByAirline(flights, dataObj.airlineFilter)
  }
  if (settingsObj.sortBy) {
    flights = sortFlights(flights, dataObj.sortBy)
  }

  return flights
}


// TIME AND DATE

export const getTime = (ms: number) => {
  const dateObj = new Date(ms)
  const hours = dateObj.getHours() > 9 ? '' + dateObj.getHours() : '0' + dateObj.getHours()
  const minutes = dateObj.getMinutes() > 9 ? '' + dateObj.getMinutes() : '0' + dateObj.getMinutes()
  return `${hours}:${minutes}`
}

export const getDate = (ms: number) => {
  const dateObj = new Date(ms)
  const day = dateObj.getDate()
  const month = getMonthName(dateObj.getMonth())
  const weekDay = getWeekDayName(dateObj.getDay())
  return `${day} ${month}. ${weekDay}`
}

export const getHoursAndMinutes = (ms: number) => {
  const hours = Math.floor(ms / 1000 / 60 / 60)
  let minutes: number | string = Math.floor((ms - hours * 1000 * 60 * 60) / 1000 / 60)
  if (minutes < 10) minutes = '0' + minutes
  return { hours, minutes }
}

const getMonthName = (num: number) => {
  switch (num) {
    case 0: return 'янв'
    case 1: return 'фев'
    case 2: return 'мар'
    case 3: return 'апр'
    case 4: return 'май'
    case 5: return 'июн'
    case 6: return 'июл'
    case 7: return 'авг'
    case 8: return 'сен'
    case 9: return 'окт'
    case 10: return 'ноя'
    case 11: return 'дек'
    default: return '???'
  }
}

const getWeekDayName = (num: number) => {
  switch (num) {
    case 0: return 'вс'
    case 1: return 'пн'
    case 2: return 'вт'
    case 3: return 'ср'
    case 4: return 'чт'
    case 5: return 'пт'
    case 6: return 'сб'
    default: return '???'
  }
}