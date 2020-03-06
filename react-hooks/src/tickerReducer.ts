import { FetchStates } from "./FetchStates";
import { PriceDirections } from "./PriceDirections";
import { TickerState } from "./TickerState";

type SuccessAction = {
  type: FetchStates.Success;
  payload: TickerState;
};

type FailureAction = {
  type: FetchStates.Failure;
  error: string;
};

interface State extends TickerState {
  priceDirection: PriceDirections;
  error: string;
}

export const tickerInitialState: State = {
  priceDirection: PriceDirections.UNKNOWN,
  last: 0,
  open: 0,
  bid: 0,
  ask: 0,
  high: 0,
  low: 0,
  volume: 0,
  error: ""
};

export const tickerReducer = (
  state: State,
  action: SuccessAction | FailureAction
): State => {
  switch (action.type) {
    case FetchStates.Success:
      return {
        ...state,
        ...action.payload,
        priceDirection:
          action.payload.last >= state.last
            ? PriceDirections.UP
            : PriceDirections.DOWN
      };
    case FetchStates.Failure:
      return { ...state };
    default:
      return state;
  }
};
