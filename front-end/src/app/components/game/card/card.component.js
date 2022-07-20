import "./card.component.scss";
import template from "./card.component.html";
import { Component } from "../../../utils/component";

export class CardComponent extends Component {
  
  /* class CardComponent constructor */
  constructor(id, flipped = false, matched = false) {

    super("card");

    this._id = id;

  // is this card flipped ?
    this._flipped = flipped;

    // has the matching card has been discovered already ?
    this.matched = matched;

    this._imageElt = super.getElement().querySelector(".card-wrapper");
    
    this._imageElt.querySelector("img.front-face").src =
      require(`./assets/card-${this._id}.png`);
    this._imageElt.querySelector("img.back-face").src =
      require(`./assets/back.png`);
    
    if(this._flipped == true){
      this._imageElt.classList.toggle("flip");
    }
  }

  /* method CardComponent.template */
  getTemplate() {
    return template;
  }

  /* method CardComponent.flip */
  flip() {
    this._imageElt.classList.toggle("flip");
    this._flipped = !this._flipped;
  }

  /* method CardComponent.equals */
  equals(card) {
    return card._id === this._id;
  }

  /* CardComponent.get flipped() */
  get flipped() {
    return this._flipped;
  }

  /* CardComponent.set flipped() */
  set flipped(newFlipped) {
    this._flipped=newFlipped;
  }
}
