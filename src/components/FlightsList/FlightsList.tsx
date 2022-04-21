import React from "react";
import styled from "styled-components";
import FlightListItem from "./FlightListItem/FlightsListItem"

const FlightListItemStyled = styled.li`
  background-color: orange;
`

const FlightsListWrapper = styled.main`
  flex-grow: 1;

  background-color: yellow;
`

const FlightsList = () => {
  return (
    <FlightsListWrapper>
      <ul>
        <FlightListItem />
      </ul>
    </FlightsListWrapper>
  )
}

export default FlightsList