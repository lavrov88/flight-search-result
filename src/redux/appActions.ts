import { ChangeAirlinesFilterAction, ChangeFlightListSortingAction, ChangePriceRangeAction, PriceType, ProcessFlightListAction, SetTransferFilterAction, SortVariants, TransferOption } from "../types";

export const sortFlightList = (sortBy: SortVariants): ChangeFlightListSortingAction => ({
  type: 'CHANGE_FLIGHT_LIST_SORTING',
  payload: sortBy
})

export const setTransferFilter = (transferOption: TransferOption): SetTransferFilterAction => ({
  type: 'SET_TRANSFER_FILTER',
  payload: transferOption
})

export const changePriceRange = (priceType: PriceType, value: number): ChangePriceRangeAction => ({
  type: 'CHANGE_PRICE_RANGE',
  payload: { priceType, value }
})

export const changeAirlinesFilter = (airline: string): ChangeAirlinesFilterAction => ({
  type: 'CHANGE_AIRLINES_FILTER',
  payload: airline
})

export const processFlightList = (): ProcessFlightListAction => ({
  type: 'PROCESS_FLIGHT_LIST'
})