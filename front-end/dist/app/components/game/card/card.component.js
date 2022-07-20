"use strict";

require("core-js/modules/es.object.define-property.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// TODO Step 7 import { Component } from "../../../utils/component";
// TODO Step 7 import template from  "./card.component.html"
// TODO Step 7 remove this closure

/* class CardComponent constructor */
(function () {
  var CardComponent = /*#__PURE__*/function () {
    function CardComponent(id) {
      _classCallCheck(this, CardComponent);

      // is this card flipped ?
      this._flipped = false; // has the matching card has been discovered already ?

      this.matched = false;
      this._id = id;
      this._imageElt = this.getElement().querySelector(".card-wrapper"); // TODO Step 7: Update the path for images with 'src/app/components/game/card/assets/card***'

      this._imageElt.querySelector("img.front-face").src = "./card/assets/card-".concat(this._id, ".png");
      this._imageElt.querySelector("img.back-face").src = "./card/assets/back.png";
    }
    /* method CardComponent.getElement */
    // TODO Step 7: remove this method


    _createClass(CardComponent, [{
      key: "getElement",
      value: function getElement() {
        if (!this._elt) {
          this._elt = document.getElementById("card-template").content.cloneNode(true).firstElementChild;
        }

        return this._elt;
      } // TODO Step 7 implement getTemplate() {}

      /* method CardComponent.flip */

    }, {
      key: "flip",
      value: function flip() {
        this._imageElt.classList.toggle("flip");

        this._flipped = !this._flipped;
      }
      /* method CardComponent.equals */

    }, {
      key: "equals",
      value: function equals(card) {
        return card._id === this._id;
      }
      /* CardComponent.get flipped() */

    }, {
      key: "flipped",
      get: function get() {
        return this._flipped;
      }
      /* CardComponent.set flipped() */
      ,
      set: function set(newFlipped) {
        this._flipped = newFlipped;
      }
    }]);

    return CardComponent;
  }(); // put component in global scope, to be runnable right from the HTML.
  // TODO Step 7 export CardComponent


  window.CardComponent = CardComponent;
  var environment = {
    api: {
      host: "http://localhost:8081"
    }
  };
})();