import React from "react";
import styled from "styled-components";
import { getDate, getHoursAndMinutes, getTime } from "../../../common/tools";
import { FlightLegProps, FlightListItemProps } from "../../../types";

const FlightListItemLeg = ({ airlineName, arrival, departure, segments, travelTime }: FlightLegProps) => {
  return (
    <FlightListItemLegStyled>
      <div className="flight_list_item_section__from_to">
        {departure.city}, {departure.airportName} <span>({departure.airportUid})</span> → {arrival.city}, {arrival.airportName} <span>({arrival.airportUid})</span>
      </div>
      <div className="flight_list_item_section__time">
        <div className="flight_list_item_section__time_start">
          {getTime(departure.date)} {getDate(departure.date)}
        </div>
        <div className="flight_list_item_section__time_during">
          🕑 {getHoursAndMinutes(travelTime).hours} ч {getHoursAndMinutes(travelTime).minutes} мин
        </div>
        <div className="flight_list_item_section__time_finish">
          {getTime(arrival.date)} {getDate(arrival.date)}
        </div>
      </div>
      <div className="flight_list_item_section__transfer">
        <span>{segments > 1 ? segments - 1  + ` пересадка`: `Без пересадок`}</span>
      </div>
      <div className="flight_list_item_section__airline">
        Рейс выполняет: {airlineName}
      </div>
    </FlightListItemLegStyled>
  )
}

const FlightListItem = ({ airlineLogo, leg1, leg2, price }: FlightListItemProps) => {
  return (
    <FlightListItemStyled>
      <FlitghtListItemHeaderStyled>
        <div className="flight_list_item_header__airline">
          {airlineLogo}
        </div>
        <div className="flight_list_item_header__price">
          <div>{price} ₽</div>
          <div className="price_description">Стоимость для одного взрослого пассажира</div>
        </div>
      </FlitghtListItemHeaderStyled>

      <FlightListItemLeg 
        airlineName={leg1.airlineName}
        arrival={leg1.arrival}
        departure={leg1.departure}
        segments={leg1.segments}
        travelTime={leg1.travelTime}
      />
      <DividerStyled />
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

    </FlightListItemStyled>
  )
}

export default FlightListItem


const FlightListItemStyled = styled.li`
  background-color: #fff;
  margin-bottom: 30px;

  & .flight_list_item_footer {
    margin-top: 5px;
  }

  & .flight_item_choose_btn {
    height: 35px;
    width: 100%;
    border: none;

    background-color: #FFB168;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const FlitghtListItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 15px 6px;

  background-color: #0087C9;
  color: #fff;

  & .flight_list_item_header__airline {
    display: flex;
    align-items: center;
    font-size: 22px;
    line-height: 1;
  }

  & .flight_list_item_header__price {
    text-align: right;
    font-size: 22px;

    & .price_description {
      font-size: 11px;
      line-height: 1;
    }
  }
`

const FlightListItemLegStyled = styled.div`
  padding: 5px 20px;

  & .flight_list_item_section__from_to span {
    color: #0087C9;
  }

  & .flight_list_item_section__time {
    display: flex;
    justify-content: space-between;
    padding: 10px 0%;
  }

  & .flight_list_item_section__transfer {
    position: relative;
    display: flex;
    justify-content: center;

    font-size: 15px;

    & span {
      z-index: 1;
      
      background-color: #fff;
      padding: 0 5px;
    }

    &::before {
      position: absolute;
      content: '';
      top: 55%;
      left: 5%;
      height: 1px;
      width: 90%;

      background-color: #ccc;
    }
  }
`

const DividerStyled = styled.div`
  width: 100%;
  height: 2px;
  margin: 5px 0;
  
  background-color: #0087C9;
`