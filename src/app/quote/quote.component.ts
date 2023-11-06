import {Component, OnInit} from '@angular/core';
import {QuoteObject} from "./QuoteObject";
import * as quotesData from '../../assets/data/quotes.json';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  quote: QuoteObject = { quote:"", author:"" };
  hover: boolean = false;
  hoverIcon: boolean = false;

  ngOnInit(): void {
    let lastChange = localStorage.getItem("lastChange");
    this.quote = localStorage.getItem("quote") ? JSON.parse(localStorage.getItem("quote")!) : this.quote;
    if (lastChange == null || lastChange != new Date().getDay().toString()) {
      this.setRandomQuote();
    }
  }

  setRandomQuote() {
    let quotes: QuoteObject[] = quotesData;
    let index = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[index];
    localStorage.setItem("quote", JSON.stringify(this.quote));
    localStorage.setItem("lastChange", new Date().getDay().toString());
  }
}
