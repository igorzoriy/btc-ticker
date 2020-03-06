import React from "react";
import { TickerState } from "./TickerState";
import styles from "./Ticker.module.css";
import { PriceDirections } from "./PriceDirections";

interface TickerProps extends TickerState {
  title: string;
  priceDirection: PriceDirections;
}

export const Ticker: React.SFC<TickerProps> = ({
  title,
  last,
  bid,
  ask,
  volume,
  priceDirection
}) => {
  let directionClass = "";
  switch (priceDirection) {
    case PriceDirections.UP:
      directionClass = styles.green;
      break;
    case PriceDirections.DOWN:
      directionClass = styles.red;
  }

  return (
    <div className={styles.ticker}>
      <div className={styles.title}>{title}</div>
      <div className={`${styles.wide} ${directionClass}`}>
        Last price: {last}
      </div>
      <div className={styles.green}>Bid: {bid}</div>
      <div className={styles.red}>Ask: {ask}</div>
      <div className={styles.wide}>Volume: {volume}</div>
    </div>
  );
};
