import { parseUrl } from "../../utils/utils";
import { Component } from "../../utils/component";
import template from "./score.component.html"
import * as localforage from "localforage/dist/localforage";
import "./score.component.scss"

const environment = {
    api: {
      host: "http://localhost:8081",
    },
  };

export class ScoreComponent extends Component {

    /* class ScoreComponent constructor */
    constructor(){
        super("score");
        let params = parseUrl();
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    /* method ScoreComponent.init */
    async init() {
        await localforage.clear();
        document.getElementById('username').innerText = this.name;
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;
        await this.getScores();
    }

    /* method ScoreComponent.getScores */
    async getScores(){
        //Fetch API
        const scores = await fetch(`${environment.api.host}/scores`, {
            method: "GET",
        }).then((response) => response.json());
        this.showScores(scores);
    }

    /* method ScoreComponent.showScores */
    showScores(scores) {
        scores.sort((x, y) => x.time - y.time);
        const table = document.createElement("table");
        table.style.border = "solid #34495e";
        const thead = table.createTHead();
        let row = thead.insertRow();
        row.style.backgroundColor = "#4274b5";
        row.style.color = "#ecf0f1";
        row.style.fontWeight = "bold";
        row.style.borderBottom = "solid #34495e";
        let cell = row.insertCell();
        cell.appendChild(document.createTextNode("#"));
        cell.style.borderRight = "solid #34495e";
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("Name"));
        cell.style.borderRight = "solid #34495e";
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("Size"));
        cell.style.borderRight = "solid #34495e";
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("Time"));
        const tbody = table.createTBody();
        tbody.style.backgroundColor = "#e2e5e6";
        let game = false;
        scores.forEach(
            (score, i) => {
                row = tbody.insertRow();
                cell = row.insertCell();
                let nb = document.createTextNode(++i);
                cell.appendChild(nb);
                cell.style.borderRight = "solid #34495e";
                cell.style.borderBottom = "solid #34495e";
                cell = row.insertCell();
                let name = document.createTextNode(score.name);
                cell.appendChild(name);
                cell.style.borderRight = "solid #34495e";
                cell.style.borderBottom = "solid #34495e";
                cell = row.insertCell();
                let size = document.createTextNode(score.size + " pairs");
                cell.appendChild(size);
                cell.style.borderRight = "solid #34495e";
                cell.style.borderBottom = "solid #34495e";
                cell = row.insertCell();
                let time = document.createTextNode(score.time + " seconds");
                cell.appendChild(time);
                cell.style.borderBottom = "solid #34495e";
                if(score.name == this.name && score.size == this.size && score.time == score.time && !game){
                    row.style.backgroundColor = "#80e972";
                    game = true;
                }
            }
        );
        document.getElementById("scores").appendChild(table);
    }

    /* method ScoreComponent.template */
    getTemplate() {
        return template;
    }
}

