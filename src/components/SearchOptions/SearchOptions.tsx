import React from "react"
import styled from 'styled-components'
import { changeAirlinesFilter, changePriceRange, processFlightList, setTransferFilter, sortFlightList } from "../../redux/appActions"
import { AirlineItemProps, SearchOptionsProps } from "../../types"

const AirlineItem = ({ name, isChecked, isActive, cheapestFlight, dispatch }: AirlineItemProps) => {
  const handleAirlineFilter = (name: string) => {
    dispatch(changeAirlinesFilter(name))
    dispatch(processFlightList())
  }

  return (
  <CheckboxItemStyled>
    <label className={"form_option form_checkbox_option" + (isActive ? "" : " disabled")}>
      <input 
        type="checkbox" 
        checked={isChecked}
        disabled={!isActive}
        name={name} 
        onChange={() => handleAirlineFilter(name)} 
      />
      - {name} от {cheapestFlight} руб.
    </label>
  </CheckboxItemStyled>
)}

const SearchOptions = ({ app, dispatch }: SearchOptionsProps) => {

  const sortChangeHandler = (e: any) => {
    dispatch(sortFlightList(e.target.value))
    dispatch(processFlightList())
  }

  const transferOptionsHandler = (e: any) => {
    dispatch(setTransferFilter(e.target.value))
    dispatch(processFlightList())
  }

  const priceRangeFilter = (e: any) => {
    const currentPriceRange = {
      priceFrom: app.searchOptions.priceFilter.priceFrom,
      priceTo: app.searchOptions.priceFilter.priceTo
    }

    if (e.target.name === 'priceFrom' && e.target.value < currentPriceRange.priceTo) {
      dispatch(changePriceRange(e.target.name, +e.target.value))
      dispatch(processFlightList())
    }
    if (e.target.name === 'priceTo' && e.target.value > currentPriceRange.priceFrom) {
      dispatch(changePriceRange(e.target.name, +e.target.value))
      dispatch(processFlightList())
    }
  }

  return (
  <SearchOptionsWrapper>
    <form>

      <FormSection>
        <H4>Сортировать</H4>
        <div className="form_option form_radio_option">
          <label>
            <input 
              onChange={sortChangeHandler}
              type="radio" 
              name="sort" 
              value="price_increase" 
              checked={app.searchOptions.sortBy === 'price_increase'} 
            />
            - по возрастанию цены
          </label>
        </div>
        <div className="form_option form_radio_option">
          <label>
            <input 
              onChange={sortChangeHandler}
              type="radio" 
              name="sort" 
              value="price_decrease" 
              checked={app.searchOptions.sortBy === 'price_decrease'} 
            />
            - по убыванию цены
          </label>
        </div>
        <div className="form_option form_radio_option">
          <label>
            <input 
              onChange={sortChangeHandler}
              type="radio"
              name="sort"
              value="travel_time" 
              checked={app.searchOptions.sortBy === 'travel_time'} 
            />
            - по времени в пути
          </label>
        </div>
      </FormSection>

      <FormSection>
        <H4>Фильтровать</H4>
        <CheckboxItemStyled>
          <label className={"form_option form_checkbox_option" + (app.searchOptions.segmentsFilter.transfer_1.isActive ? "" : " disabled")}>
            <input
              onChange={transferOptionsHandler} 
              type="checkbox" 
              checked={app.searchOptions.segmentsFilter.transfer_1.isChecked}
              disabled={!app.searchOptions.segmentsFilter.transfer_1.isActive}
              name="transfer" 
              value="transfer_1" />
            - 1 пересадка
          </label>
        </CheckboxItemStyled>
        <CheckboxItemStyled>
          <label className={"form_option form_checkbox_option" + (app.searchOptions.segmentsFilter.transfer_0.isActive ? "" : " disabled")}>
            <input
              onChange={transferOptionsHandler} 
              type="checkbox" 
              checked={app.searchOptions.segmentsFilter.transfer_0.isChecked}
              disabled={!app.searchOptions.segmentsFilter.transfer_0.isActive}
              name="transfer" 
              value="transfer_0" />
            - без пересадок
          </label>
        </CheckboxItemStyled>
      </FormSection>

      <FormSection>
        <H4>Цена</H4>
        <FormPriceOption className="form_option form_input_option">
          <label>
            От 
            <input 
              onChange={priceRangeFilter} 
              name="priceFrom"
              value={app.searchOptions.priceFilter.priceFrom}
            />
          </label>
        </FormPriceOption>
        <FormPriceOption className="form_option form_input_option">
          <label>
            До 
            <input 
              onChange={priceRangeFilter} 
              name="priceTo" 
              value={app.searchOptions.priceFilter.priceTo}
            />
          </label>
        </FormPriceOption>
      </FormSection>

      <FormSection>
        <H4>Авиакомпании</H4>
        {app.searchOptions.airlineFilter.map(a => <AirlineItem 
                                                    name={a.name}
                                                    isChecked={a.isChecked}
                                                    isActive={a.isActive}
                                                    cheapestFlight={a.cheapestFlight} 
                                                    dispatch={dispatch}
                                                    key={a.name} 
                                                  />)}
      </FormSection>

    </form>
  </SearchOptionsWrapper>
)}

export default SearchOptions


const SearchOptionsWrapper = styled.nav`
  width: 250px;
  min-width: 250px;
  padding: 20px;

  font-size: 14px;
`
const FormSection = styled.div`
  margin-bottom: 24px;
`
const H4 = styled.h4`
  margin: 0;
  margin-bottom: 8px;
`
const FormPriceOption = styled.div`
  display: flex;
  margin-bottom: 8px;

  & > label {
    width: 25px
  }
`

const CheckboxItemStyled = styled.div`
  margin-bottom: 5px;

  & label.disabled {
    color: #808080;
  }
`