import { observable, computed, action } from "mobx";
import { PriceDirections } from "./PriceDirections";

export class TickerModel {
  @observable
  last = 0;
  @observable
  prev = 0;
  @observable
  bid = 0;
  @observable
  ask = 0;
  @observable
  volume = 0;

  @computed
  get priceDirection() {
    if (this.last === 0 || this.prev === 0) {
      return PriceDirections.UNKNOWN;
    } else if (this.last > this.prev) {
      return PriceDirections.UP;
    } else if (this.last < this.prev) {
      return PriceDirections.DOWN;
    } else {
      return PriceDirections.UNKNOWN;
    }
  }

  @action
  update(data: any) {
    const last = parseFloat(data.last);
    if (last !== this.last) {
      this.prev = this.last;
    }
    this.last = last;

    this.bid = parseFloat(data.bid);
    this.ask = parseFloat(data.ask);
    this.volume = parseFloat(data.volume);
  }
}
