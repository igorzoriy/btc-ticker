<script>
  import { onMount, onDestroy } from 'svelte';
  import Ticker from "./Ticker.svelte";
  import { startPolling } from "./polling";

  const btcTicker = {
    last: 0,
    bid: 0,
    ask: 0,
    volume: 0,
    priceDirection: ""
  };

  let stopPolling;
  onMount(() => {
    stopPolling = startPolling(
      "https://www.bitstamp.net/api/v2/ticker_hour/btcusd/",
      data => {
        const last = parseFloat(data.last);
        if (last > btcTicker.last) {
          btcTicker.priceDirection = "up";
        } else if (last < btcTicker.last) {
          btcTicker.priceDirection = "down";
        }
        btcTicker.last = last;
        btcTicker.bid = parseFloat(data.bid);
        btcTicker.ask = parseFloat(data.ask);
        btcTicker.volume = parseFloat(data.volume);
      },
      error => console.log(error),
      1000
    );
  });
  onDestroy(() => {
    stopPolling && stopPolling();
  });
</script>

<div id="app">
  <div class="container">
    <Ticker title="BTC/USD" {...btcTicker} />
  </div>
</div>

<style>
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
