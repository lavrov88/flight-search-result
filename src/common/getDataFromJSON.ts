import { FlightDataObject, FlightLeg } from "../types"

const getDurationAndSegments = (arr: any): FlightLeg => {
  return {
    segments: arr.length,
    travelTime: Date.parse(arr[arr.length - 1].arrivalDate) - Date.parse(arr[0].departureDate),
    departureDate: Date.parse(arr[0].departureDate),
    departureAirport: arr[0].departureAirport,
    departureCity: arr[0].departureCity ? arr[0].departureCity.caption : arr[0].departureAirport.caption,
    arrivalAirport: arr[arr.length - 1].arrivalAirport,
    arrivalCity: arr[arr.length - 1].arrivalCity ? arr[arr.length - 1].arrivalCity.caption : arr[arr.length - 1].arrivalAirport.caption,
    arrivalDate: Date.parse(arr[arr.length - 1].arrivalDate)
  }
}

const getDataFromJSON = (arr: any): FlightDataObject[] => {
  let result = [...arr.result.flights]

  result = result.map(r => {
    const leg0Segments = r.flight.legs[0].segments.length
    const travelTimeOfLeg0 = Date.parse(r.flight.legs[0].segments[leg0Segments - 1].arrivalDate) - Date.parse(r.flight.legs[0].segments[0].departureDate)
    const leg1Segments = r.flight.legs[1].segments.length
    const travelTimeOfLeg1 = Date.parse(r.flight.legs[1].segments[leg1Segments - 1].arrivalDate) - Date.parse(r.flight.legs[1].segments[0].departureDate)

    return {
      bothSidesTravelTime: travelTimeOfLeg0 + travelTimeOfLeg1,
      carrier: {
        airlineCode: r.flight.carrier.airlineCode,
        caption: r.flight.carrier.caption
      },
      price: +r.flight.price.total.amount,
      legs: [getDurationAndSegments(r.flight.legs[0].segments), getDurationAndSegments(r.flight.legs[1].segments)]
    }
  })
  return result
}

export default getDataFromJSON

