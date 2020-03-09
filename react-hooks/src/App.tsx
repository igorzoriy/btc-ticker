import React, { useReducer, useEffect } from "react";
import styles from "./App.module.css";
import { Ticker } from "./Ticker";
import { startPolling } from "./polling";
import { FetchStates } from "./FetchStates";
import { tickerReducer, tickerInitialState } from "./tickerReducer";

export const App = () => {
  const [state, dispatch] = useReducer(tickerReducer, tickerInitialState);

  useEffect(() => {
    const stopPolling = startPolling(
      "https://www.bitstamp.net/api/v2/ticker_hour/btcusd/",
      data => {
        const payload = {
          last: parseFloat(data.last),
          open: parseFloat(data.open),
          high: parseFloat(data.high),
          low: parseFloat(data.low),
          bid: parseFloat(data.bid),
          ask: parseFloat(data.ask),
          volume: parseFloat(data.volume)
        };
        dispatch({
          type: FetchStates.Success,
          payload
        });
      },
      error =>
        dispatch({
          type: FetchStates.Failure,
          error: error.message
        }),
      1000
    );

    return () => stopPolling();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Ticker title="BTC/USD" {...state} />
      </div>
    </div>
  );
};
