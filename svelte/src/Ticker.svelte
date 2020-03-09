<script>
  export let title;
  export let last;
  export let bid;
  export let ask;
  export let volume;
  export let priceDirection;
</script>

<div class="ticker">
  <div class="title">{ title }</div>
  <div class="wide">
    Last price: { last }&nbsp;
    {#if priceDirection === "up"}
        <span class="green">(up)</span>
    {/if}
    {#if priceDirection === "down"}
        <span class="red">(down)</span>
    {/if}
  </div>
  <div class="green">Bid: { bid }</div>
  <div class="red">Ask: { ask }</div>
  <div class="wide">Volume: { volume }</div>
</div>

<style>
.ticker {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  border: 1px solid #c4c7c9;
  margin: 1rem;
  padding: 0 0 1rem 1rem;
}

.ticker div {
  margin: 1rem 1rem 0 0;
}

.title {
  grid-column: 1 / 3;
  font-size: 1.2em;
  text-align: center;
}

.wide {
  grid-column: 1 / 3;
  text-align: center;
}

.green {
  color: #16b157;
}

.red {
  color: #f05359;
}
</style>
