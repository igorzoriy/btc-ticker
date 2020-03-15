import { observable } from "mobx";
import { TickerModel } from "./TickerModel";

export class AppStore {
  @observable btcusdTicker = new TickerModel();
}
