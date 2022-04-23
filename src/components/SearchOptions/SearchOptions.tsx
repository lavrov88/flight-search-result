import React from "react"
import styled from 'styled-components'
import { AirlineItemProps, SearchOptionsProps } from "../../types"

const AirlineItem = ({ name }: AirlineItemProps) => (
  <div className="form_option form_checkbox_option">
    <label>
      <input type="checkbox" name={name} />
      - {name} от 21049 руб.
    </label>
  </div>
)

const SearchOptions = ({ app }: SearchOptionsProps) => {

  const sortFilterFormHandler = (e: any) => {
    console.log(e.target)
    if (e.target.name === 'sort') {
      console.log('this is sort options!')
    }
    if (e.target.name === 'transfer') {
      console.log('this transfer options!')
    }
    
  }

  const airlinesFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.target)
  }

  return (
  <SearchOptionsWrapper>
    <form onChange={sortFilterFormHandler}>

      <FormSection>
        <H4>Сортировать</H4>
        <div className="form_option form_radio_option">
          <label>
            <input type="radio" name="sort" value="price_increase" />
            - по возрастанию цены
          </label>
        </div>
        <div className="form_option form_radio_option">
          <label>
            <input type="radio" name="sort" value="price_decrease" />
            - по убыванию цены
          </label>
        </div>
        <div className="form_option form_radio_option">
          <label>
            <input type="radio" name="sort" value="travel_time" />
            - по времени в пути
          </label>
        </div>
      </FormSection>

      <FormSection>
        <H4>Фильтровать</H4>
        <div className="form_option form_checkbox_option">
          <label>
            <input type="checkbox" name="transfer" value="transfer_1" />
            - 1 пересадка
          </label>
        </div>
        <div className="form_option form_checkbox_option">
          <label>
            <input type="checkbox" name="transfer" value="transfer_0" />
            - без пересадок
          </label>
        </div>
      </FormSection>

      <FormSection>
        <H4>Цена</H4>
        <FormPriceOption className="form_option form_input_option">
          <label htmlFor="priceFrom">От </label>
          <input id="priceFrom" name="priceFrom" />
        </FormPriceOption>
        <FormPriceOption className="form_option form_input_option">
          <label htmlFor="priceTo">До </label>
          <input id="priceTo" name="priceTo" />
        </FormPriceOption>
      </FormSection>

    </form>

    <form onChange={airlinesFormHandler}>

      <FormSection>
        <H4>Авиакомпании</H4>
        {app.searchOptions.airlineFilter.map(a => <AirlineItem name={a} key={a} />)}
      </FormSection>

    </form>
  </SearchOptionsWrapper>
)}

export default SearchOptions


const SearchOptionsWrapper = styled.nav`
  width: 300px;
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