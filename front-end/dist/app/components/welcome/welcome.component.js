"use strict";

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.define-property.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// TODO Step 7 import { Component } from "../../utils/component";
// TODO Step 7 import template from  "./welcome.component.html"
(function () {
  // TODO Step 7 remove this closure

  /* class WelcomeComponent constructor  */
  var WelcomeComponent = /*#__PURE__*/function () {
    function WelcomeComponent() {
      _classCallCheck(this, WelcomeComponent);
    }
    /* method WelcomeComponent.init */


    _createClass(WelcomeComponent, [{
      key: "init",
      value: function init() {
        var form = document.querySelector('form.form-signin');
        form.addEventListener('submit', function (event) {
          event.preventDefault();

          if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
          } else {
            var name = event.srcElement.querySelector('#nickname').value;
            var size = parseInt(event.srcElement.querySelector('#size').value);

            _startGame(name, size);
          }
        }, false);
        return this;
      }
    }]);

    return WelcomeComponent;
  }(); // TODO Step 7 implement getTemplate() {}


  function _startGame(name, size) {
    // TODO Step 7: change path to: `game?name=${name}=name&size=${size}`
    window.location = "../game/game.component.html?name=".concat(name, "&size=").concat(size);
  } // put component in global scope, to be runnable right from the HTML.
  // TODO Step 7 export WelcomeComponent


  window.WelcomeComponent = WelcomeComponent;
})();