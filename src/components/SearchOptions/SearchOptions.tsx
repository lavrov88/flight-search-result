import React from "react"
import styled from 'styled-components'

const SearchOptionsWrapper = styled.nav`
  width: 300px;
  background-color: red;
`
const FormSection = styled.div`
  margin-bottom: 20px;
`

const SearchOptions = () => {
  return (
    <SearchOptionsWrapper>
      <form action="">

        <FormSection>
          <h4>Сортировать</h4>
          <div className="form_option form_radio_option">
            <input type="radio" id="sort1" name="sort" value="priceIncreace" />
            <label htmlFor="sort1">- по возрастанию цены</label>
          </div>
          <div className="form_option form_radio_option">
            <input type="radio" id="sort2" name="sort" value="priceDecreace" />
            <label htmlFor="sort2">- по убыванию цены</label>
          </div>
          <div className="form_option form_radio_option">
            <input type="radio" id="sort3" name="sort" value="travelTime" />
            <label htmlFor="sort3">- по времени в пути</label>
          </div>
        </FormSection>

        <FormSection>
          <h4>Фильтровать</h4>
          <div className="form_option form_checkbox_option">
            <input type="checkbox" id="transfer_1" name="transfer"/>
            <label htmlFor="transfer_1">- 1 пересадка</label>
          </div>
          <div className="form_option form_checkbox_option">
            <input type="checkbox" id="transfer_0" name="transfer"/>
            <label htmlFor="transfer_0">- без пересадок</label>
          </div>
        </FormSection>

        <FormSection>
          <h4>Цена</h4>
          <div className="form_option form_input_option">
            <label htmlFor="priceFrom">От </label>
            <input id="priceFrom" name="priceFrom" value="0"/>
          </div>
          <div className="form_option form_input_option">
            <label htmlFor="priceTo">До </label>
            <input id="priceTo" name="priceTo" value=""/>
          </div>
        </FormSection>

        <FormSection>
          <h4>Цена</h4>
          <div className="form_option form_checkbox_option">
            <input type="checkbox" id="airlines_LOT" name="airlines_LOT"/>
            <label htmlFor="airlines_LOT">- LOT Polish Airlines от 21049 руб.</label>
          </div>
          <div className="form_option form_checkbox_option">
            <input type="checkbox" id="airlines_SU" name="airlines_SU"/>
            <label htmlFor="airlines_SU">- Аэрофлот - российские авиалинии от 31049 руб.</label>
          </div>
        </FormSection>


      </form>
    </SearchOptionsWrapper>
  )
}


export default SearchOptions