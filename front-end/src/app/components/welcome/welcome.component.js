import { Component } from "../../utils/component";
import template from  "./welcome.component.html"
    
export class WelcomeComponent extends Component{

    /* class WelcomeComponent constructor  */
    constructor(){
        super("welcome");
    }   

    /* method WelcomeComponent.init */
    init() {
        let form = document.querySelector('form.form-signin');

        form.addEventListener('submit', (event) => {   

            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                let name = event.srcElement.querySelector('#nickname').value;
                let size = parseInt(event.srcElement.querySelector('#size').value);
                _startGame(name, size);
            }
        }, false);

        return this;
    }
    
    /* method WelcomeComponent.template */
    getTemplate() {
        return template;
    }
}

/* method _startGame */
function _startGame(name, size) {
    window.location.hash = `game?name=${name}=name&size=${size}`;
}

    
   

    
