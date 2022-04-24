import React from "react";
import { getDate, getHoursAndMinutes, getTime } from "../../../common/tools";
import { FlightLegProps, FlightListItemProps } from "../../../types";
import './FlightsListItem.css'

const FlightListItemLeg = ({ airlineName, arrival, departure, segments, travelTime }: FlightLegProps) => {
  return (
    <div className="flightlist_item_leg">
      <div className="flight_list_item_section__from_to">
        {departure.city}, {departure.airportName} <span>({departure.airportUid})</span> → {arrival.city}, {arrival.airportName} <span>({arrival.airportUid})</span>
      </div>
      <div className="flight_list_item_section__time">
        <div className="flight_list_item_section__time_start">
          {getTime(departure.date)}
          <span className="flight_list_item_section__date">{getDate(departure.date)}</span>
        </div>
        <div className="flight_list_item_section__time_during">
          🕑 {getHoursAndMinutes(travelTime).hours} ч {getHoursAndMinutes(travelTime).minutes} мин
        </div>
        <div className="flight_list_item_section__time_finish">
          <span className="flight_list_item_section__date">{getDate(arrival.date)}</span>
          {getTime(arrival.date)}
        </div>
      </div>
      <div className="flight_list_item_section__transfer">
        <span>{segments > 1 ? segments - 1  + ` пересадка`: `Без пересадок`}</span>
      </div>
      <div className="flight_list_item_section__airline">
        Рейс выполняет: {airlineName}
      </div>
    </div>
  )
}

const FlightListItem = ({ airlineLogo, leg1, leg2, price }: FlightListItemProps) => {
  return (
    <li className="flightlist_item">
      <div className="flightlist_item_header">
        <div className="flight_list_item_header__airline">
          {airlineLogo}
        </div>
        <div className="flight_list_item_header__price">
          <div>{price} ₽</div>
          <div className="price_description">Стоимость для одного взрослого пассажира</div>
        </div>
      </div>

      <FlightListItemLeg 
        airlineName={leg1.airlineName}
        arrival={leg1.arrival}
        departure={leg1.departure}
        segments={leg1.segments}
        travelTime={leg1.travelTime}
      />
      <div className="flight_list_item_divider"></div>
      <FlightListItemLeg 
        airlineName={leg2.airlineName}
        arrival={leg2.arrival}
        departure={leg2.departure}
        segments={leg2.segments}
        travelTime={leg2.travelTime}
      />

      <div className="flight_list_item_footer">
        <button className="btn flight_item_choose_btn">Выбрать</button>
      </div>

    </li>
  )
}

export default FlightListItem