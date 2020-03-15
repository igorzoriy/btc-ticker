import React from "react";
import { observer } from "mobx-react";
import styles from "./App.module.css";
import { Ticker } from "./Ticker";
import { AppStore } from "./AppStore";

@observer
export class App extends React.Component<{ store: AppStore }> {
  render() {
    const { store } = this.props;
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <Ticker title="BTC/USD" ticker={store.btcusdTicker} />
        </div>
      </div>
    );
  }
}
