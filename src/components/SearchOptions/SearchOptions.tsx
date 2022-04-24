import React from "react"
import { changeAirlinesFilter, changePriceRange, processFlightList, setTransferFilter, sortFlightList } from "../../redux/appActions"
import { AirlineItemProps, SearchOptionsProps } from "../../types"
import './SearchOptions.css'

const AirlineItem = ({ name, isChecked, isActive, cheapestFlight, dispatch }: AirlineItemProps) => {
  const handleAirlineFilter = (name: string) => {
    dispatch(changeAirlinesFilter(name))
    dispatch(processFlightList())
  }

  return (
  <div className="form_checkbox_item">
    <label className={"form_option form_checkbox_option airlines" + (isActive ? "" : " disabled")}>
      <div className="form_checkbox_option__airline_name">
        <input 
          type="checkbox" 
          checked={isChecked}
          disabled={!isActive}
          name={name} 
          onChange={() => handleAirlineFilter(name)} 
        />
        - {name}
      </div>
      <div className="form_checkbox_option__price">
        от {cheapestFlight} ₽
      </div>
    </label>
  </div>
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
    if (isNaN(+e.target.value)) return

    const currentPriceRange = {
      priceFrom: app.searchOptions.priceFilter.priceFrom,
      priceTo: app.searchOptions.priceFilter.priceTo
    }
    dispatch(changePriceRange(e.target.name, +e.target.value))
    if (e.target.name === 'priceFrom' && e.target.value > currentPriceRange.priceTo) {
      dispatch(changePriceRange('priceTo', +e.target.value))
    }
    if (e.target.name === 'priceTo' && e.target.value < currentPriceRange.priceFrom) {
      dispatch(changePriceRange('priceFrom', +e.target.value))
    }
    dispatch(processFlightList())
  }

  return (
  <nav className="search_options_wrapper">
    <form>

      <div className="form_section">
        <h4 className="form_section_title">Сортировать</h4>
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
      </div>

      <div className="form_section">
        <h4 className="form_section_title">Фильтровать</h4>
        <div className="form_checkbox_item">
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
        </div>
        <div className="form_checkbox_item">
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
        </div>
      </div>

      <div className="form_section">
        <h4 className="form_section_title">Цена</h4>
        <div className="form_option form_input_option">
          <label>
            <span>От</span>
            <input 
              onChange={priceRangeFilter} 
              name="priceFrom"
              value={app.searchOptions.priceFilter.priceFrom}
            />
          </label>
        </div>
        <div className="form_option form_input_option">
          <label>
            <span>До</span>
            <input 
              onChange={priceRangeFilter} 
              name="priceTo" 
              value={app.searchOptions.priceFilter.priceTo}
            />
          </label>
        </div>
      </div>

      <div className="form_section">
        <h4 className="form_section_title">Авиакомпании</h4>
        {app.searchOptions.airlineFilter.map(a => <AirlineItem 
                                                    name={a.name}
                                                    isChecked={a.isChecked}
                                                    isActive={a.isActive}
                                                    cheapestFlight={a.cheapestFlight} 
                                                    dispatch={dispatch}
                                                    key={a.name} 
                                                  />)}
      </div>

    </form>
  </nav>
)}

export default SearchOptions