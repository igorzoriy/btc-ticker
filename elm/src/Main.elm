module Main exposing (main)

import Browser
import Html exposing (Html, div, span, text)
import Html.Attributes exposing (style)
import Http
import Json.Decode exposing (Decoder, map4, field, string)
import Time

main = Browser.element
  {
    init = init,
    view = view,
    update = update,
    subscriptions = subscriptions
  }

type PriceDirection = PriceDirectionUp | PriceDirectionDown | PriceDirectionUnknown

type alias TickerData =
  {
      last: String,
      bid: String,
      ask: String,
      volume: String
  }

type alias Ticker =
  {
      title: String,
      priceDirection: PriceDirection,
      data: TickerData
  }

type alias Model =
  {
    btcusdTicker: Ticker
  }

type Msg = GotTickerData (Result Http.Error TickerData) | Tick Time.Posix

init : () -> (Model, Cmd Msg)
init _ =
  (
    {
      btcusdTicker =
        {
          title = "BTC/USD",
          priceDirection = PriceDirectionUnknown,
          data = {
            last = "--",
            bid = "--",
            ask = "--",
            volume = "--"
          }
        }
    },
    getTickerData
  )

getTickerData : Cmd Msg
getTickerData =
  Http.get
    { url = "https://www.bitstamp.net/api/v2/ticker_hour/btcusd/"
    , expect = Http.expectJson GotTickerData tickerDataDecoder
    }

tickerDataDecoder:Decoder TickerData
tickerDataDecoder =
  map4 TickerData
    (field "last" string)
    (field "bid" string)
    (field "ask" string)
    (field "volume" string)

getPriceDirection: Ticker -> TickerData -> PriceDirection
getPriceDirection ticker data =
  if ticker.data.last /= "--" && data.last > ticker.data.last then
    PriceDirectionUp
  else if ticker.data.last /= "--" && data.last < ticker.data.last then
    PriceDirectionDown
  else
    ticker.priceDirection

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Tick _ ->
      (model, getTickerData)
    GotTickerData result ->
      case result of
        Ok data ->
          (
            {
              model |
              btcusdTicker = updateTicker model.btcusdTicker data
            },
            Cmd.none
          )
        Err _ ->
          (model, Cmd.none)

updateTicker: Ticker -> TickerData -> Ticker
updateTicker model data =
  {
    model |
    priceDirection = getPriceDirection model data,
    data = data
  }

subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 2000 Tick

priceDirectionView: PriceDirection -> Html Msg
priceDirectionView direction =
  span [
    if direction == PriceDirectionUp then
      style "color" "#16b157"
    else if direction == PriceDirectionDown then
      style "color" "#f05359"
    else
      style "" ""
  ]
  [
    if direction == PriceDirectionUp then
      text "(up)"
    else if direction == PriceDirectionDown then
      text "(down)"
    else
      text ""
  ]

tickerView: Ticker -> Html Msg
tickerView ticker =
  div [
    style "display" "grid",
    style "grid-template-columns" "1fr 1fr",
    style "text-align" "left",
    style "border" "1px solid #c4c7c9",
    style "margin" "1rem",
    style "padding" "0 0 1rem 1rem"
  ]
  [
    div [
      style "grid-column" "1 / 3",
      style "font-size" "1.2em",
      style "text-align" "center",
      style "margin" "1rem 1rem 0 0"
    ]
    [
      text ticker.title
    ],
    div
      [
        style "grid-column" "1 / 3",
        style "text-align" "center",
        style "margin" "1rem 1rem 0 0"
      ]
      [
        text ("Last price: " ++ ticker.data.last ++ " "),
        priceDirectionView ticker.priceDirection
      ],
    div
      [
        style "color" "#16b157",
        style "margin" "1rem 1rem 0 0"
      ]
      [
        text ("Bid: " ++ ticker.data.bid)
      ],
    div
      [
        style "color" "#f05359",
        style "margin" "1rem 1rem 0 0"
      ]
      [
        text ("Ask: " ++ ticker.data.ask)
      ],
    div
      [
        style "grid-column" "1 / 3",
        style "text-align" "center",
        style "margin" "1rem 1rem 0 0"
      ]
      [
        text ("Volume: " ++ ticker.data.volume)
      ]
  ]

view : Model -> Html Msg
view model =
  div [
    style "text-align" "center",
    style "background-color" "#1b262d",
    style "color" "#c4c7c9",
    style "font-size" "calc(10px + 2vmin)",
    style "font-family" "Arial, Helvetica, sans-serif"
  ]
  [
    div [
      style "min-height" "100vh",
      style "display" "flex",
      style "flex-direction" "column",
      style "align-items" "center",
      style "justify-content" "center"
    ]
    [
      tickerView model.btcusdTicker
    ]
  ]
