<template>
  <div id="app">
    <div class="container">
      <Ticker
        title="BTC/USD"
        :last="last"
        :bid="bid"
        :ask="ask"
        :volume="volume"
        :priceDirection="priceDirection"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vuex from "vuex";
import { Component, Vue } from "vue-property-decorator";
import Ticker from "./Ticker.vue";
import { startPolling } from "./polling";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    last: 0,
    bid: 0,
    ask: 0,
    volume: 0,
    priceDirection: ""
  },
  mutations: {
    update(state, data) {
      if (data.last > state.last) {
        state.priceDirection = "up";
      } else if (data.last < state.last) {
        state.priceDirection = "down";
      }
      state.last = parseFloat(data.last);
      state.bid = parseFloat(data.bid);
      state.ask = parseFloat(data.ask);
      state.volume = parseFloat(data.volume);
    }
  }
});

const stopPolling = startPolling(
  "https://www.bitstamp.net/api/v2/ticker_hour/btcusd/",
  data => {
    store.commit("update", data);
  },
  error => console.log(error),
  1000
);

@Component({
  components: {
    Ticker
  },
  computed: {
    last: () => store.state.last,
    bid: () => store.state.bid,
    ask: () => store.state.ask,
    volume: () => store.state.volume,
    priceDirection: () => store.state.priceDirection
  },
  destroyed: () => stopPolling()
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  text-align: center;
  background-color: #1b262d;
  color: #c4c7c9;
  font-size: calc(10px + 2vmin);
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
