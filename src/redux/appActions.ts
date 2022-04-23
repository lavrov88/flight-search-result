import { SortFlightListAction, SortVariants } from "../types";

export const sortFlightList = (sortBy: SortVariants): SortFlightListAction => ({
  type: 'SORT_FLIGHT_LIST',
  payload: sortBy
})