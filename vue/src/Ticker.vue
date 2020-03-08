<template>
  <div class="ticker">
    <div class="title">{{ title }}</div>
    <div class="wide">
      Last price: {{ last }}&nbsp;
      <span v-if="priceDirection === 'up'" class="green">(up)</span>
      <span v-if="priceDirection === 'down'" class="red">(down)</span>
    </div>
    <div class="green">Bid: {{ bid }}</div>
    <div class="red">Ask: {{ ask }}</div>
    <div class="wide">Volume: {{ volume }}</div>
  </div>
</template>

<script>
export default {
  name: "Ticker",
  props: {
    title: String,
    last: Number,
    bid: Number,
    ask: Number,
    volume: Number,
    priceDirection: String
  }
};
</script>

<style scoped>
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
