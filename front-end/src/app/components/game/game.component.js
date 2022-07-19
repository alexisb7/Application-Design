import { parseUrl } from "../../utils/utils";
import { Component } from "../../utils/component";
import { CardComponent } from "./card/card.component";
import template from "./game.component.html";
import * as localforage from "localforage/dist/localforage";

const environment = {
  api: {
    host: "http://localhost:8081",
  },
};

export class GameComponent extends Component {

  /* class GameComponent constructor */
  constructor(){

    super("game");

    // gather parameters from URL
    let params = parseUrl();

    // save player name & game size
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  /* method GameComponent.init */
  async init() {

    // create a card out of the config
    this._cards = []; 

    // fetch the cards configuration from the server
    this._config = await this.fetchConfig();

    const playerName = await localforage.getItem("name");
    if(playerName != null && playerName == this._name){
      const game = await localforage.getItem("cards");
        if(game != null){
          await localforage.getItem("cards").then(
            (game_cards) => {
              const cards = JSON.parse(game_cards);
              cards.forEach(
                (game_cards) => {
                  this._cards.push(new CardComponent(
                    game_cards["_id"],
                    game_cards["_flipped"],
                    game_cards["matched"]))
          });});
          await this.restartGame();
      }
    }
    else {
      this.saveGameConfig();
      this._config.ids.forEach(
        (config) => {
          this._cards.push(new CardComponent(config));
        });
        this.saveGameState();
    }
    this._boardElement = document.querySelector(".cards");
    this._cards.forEach((card) => {
      this._boardElement.appendChild(card.getElement());
      card.getElement().addEventListener("click",
        () => {
          this._flipCard(card);
        }); 
    });
    this.start();
  }

  /* method GameComponent.restartGame */
  async restartGame() {
    this._name = await localforage.getItem("name");
    this._size = await localforage.getItem("size");
    this._matchedPairs = await localforage.getItem("matchedPairs");
    this._startTime = await localforage.getItem("startTime");
    const cards = JSON.parse(await localforage.getItem("flippedCard"));
    if(cards != null){
      const card = new CardComponent(
        cards["_id"],
        cards["_flipped"],
        cards["matched"]
      );
      this._flippedCard = this._cards.find(
        (fcard) => fcard.equals(card) && fcard._flipped == card._flipped
      );
    }
  }

  /* method GameComponent.saveGameConfig */
  saveGameConfig() {
    localforage.setItem("size", this._size);
    localforage.setItem("name", this._name);
  }

  /* method GameComponent.saveGameState */
  saveGameState() {
    localforage.setItem("matchedPairs", this._matchedPairs);
    localforage.setItem("flippedCard", JSON.stringify(this._flippedCard));
    localforage.setItem("cards", JSON.stringify(this._cards, ["_id", "_flipped", "matched"]));
  }

  /* method GameComponent.template */
  getTemplate() {
    return template;
  }

  /* method GameComponent.start */
  async start() {
    const startTime = await localforage.getItem("startTime");
    let seconds = await localforage.getItem("seconds");
    if(startTime != null && seconds != null){
      this._startTime = startTime;
    }
    else {
      this._startTime = Date.now();
      seconds = 0;
    }
    document.querySelector("nav .navbar-title").textContent =
      `Player: ${this._name}. Elapsed time: ${seconds++}`;
    this._timer = setInterval(
      () => {
        document.querySelector("nav .navbar-title").textContent =
        `Player: ${this._name}. Elapsed time: ${seconds++}`;
      },
      1000
    );
    localforage.setItem("seconds", seconds);
    localforage.setItem("startTime", this._startTime);
  }

  /* method GameComponent.fetchConfig */
  async fetchConfig() {
    return fetch(`${environment.api.host}/board?size=${this._size}`, 
    {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error while fetching config: ", error));
  }

  /* method GameComponent.gotoScore */
  gotoScore() {
    let timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);
    this._time = timeElapsedInSeconds;
    this.saveScore();
    setTimeout(
      () => {
        window.location.hash = `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`;
      },
      750
    );
  }

  /* method GameComponent.saveScore */
  async saveScore(){
    //Fetch API
    await fetch("http://localhost:8081/scores", 
      {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._name, 
        size: this._size, 
        time: this._time}),
    });
  }


  /* method GameComponent._flipCard */
  _flipCard(card) {
    if (this._busy) {
      return;
    }

    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped, and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;

        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.gotoScore();
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
          () => {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;

            // reset flipped card for the next turn.
            this._flippedCard = null;
          },
          500
        );
      }
    }
    this.saveGameState();
  }
}
