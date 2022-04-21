import React from "react";
import styled from "styled-components";

const FlightListItemSection = () => {
  return (
    <div className="flight_list_item_section section_forward">
      <div className="flight_list_item_section__from_to">
        Москва, ШЕРЕМЕТЬЕВО SVO -- Лондон, ХИТРОУ LHR
      </div>
      <div className="flight_list_item_section__time">
        <div className="flight_list_item_section__time_start">
          21:10
        </div>
        <div className="flight_list_item_section__time_during">
          14 ч 45 мин
        </div>
        <div className="flight_list_item_section__time_finish">
          09:25
        </div>
      </div>
      <div className="flight_list_item_section__transfer">
        1 пересадка
      </div>
      <div className="flight_list_item_section__airline">
        Рейс выполняет: LOT Polish Airlines
      </div>
    </div>
  )
}

const FlightListItemStyled = styled.li`
  background-color: orange;
`
const FlightListItem = () => {
  return (
    <FlightListItemStyled>
      <div className="flight_list_item_header">
        <div className="flight_list_item_header__airline">
          AIRLINE
        </div>
        <div className="flight_list_item_header__price">
          20522 руб.
        </div>
      </div>

      <FlightListItemSection />
      <FlightListItemSection />

      <div className="flight_list_item_footer">
        <button>Выбрать</button>
      </div>

    </FlightListItemStyled>
  )
}

export default FlightListItem