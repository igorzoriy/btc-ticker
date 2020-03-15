import React from "react";
import { observer } from "mobx-react";
import styles from "./Ticker.module.css";
import { PriceDirections } from "./PriceDirections";
import { TickerModel } from "./TickerModel";

@observer
export class Ticker extends React.Component<{
  title: string;
  ticker: TickerModel;
}> {
  render() {
    const { title, ticker } = this.props;
    let direction;
    switch (ticker.priceDirection) {
      case PriceDirections.UP:
        direction = <span className={styles.green}>(up)</span>;
        break;
      case PriceDirections.DOWN:
        direction = <span className={styles.red}>(down)</span>;
    }

    return (
      <div className={styles.ticker}>
        <div className={styles.title}>{title}</div>
        <div className={styles.wide}>
          Last price: {ticker.last} {direction}
        </div>
        <div className={styles.green}>Bid: {ticker.bid}</div>
        <div className={styles.red}>Ask: {ticker.ask}</div>
        <div className={styles.wide}>Volume: {ticker.volume}</div>
      </div>
    );
  }
}
