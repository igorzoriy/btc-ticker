import React from "react";
import ReactDOM from "react-dom";
import { startPolling } from "./polling";
import "./index.css";
import { App } from "./App";
import { AppStore } from "./AppStore";

const store = new AppStore();
startPolling(
  "https://www.bitstamp.net/api/v2/ticker_hour/btcusd/",
  data => store.btcusdTicker.update(data),
  error => console.error(error),
  1000
);

ReactDOM.render(<App store={store} />, document.getElementById("root"));
