// DATA EXTRACT

import { FlightDataObject } from "../types"

export const getAllAirlines = (flights: FlightDataObject[]) => {
  const setData =  new Set(flights.map(f => f.carrier.caption)) 
  const arrData: string[] = []
  setData.forEach(airline => arrData.push(airline))
  return arrData
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