import {Component} from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  value: string = "";

  engines: SearchEngine[] = [
    {name: "Google", url: "https://www.google.com", search: "/search?q=", whitespace: "+"},
    {name: "Bing", url: "https://www.bing.com", search: "/search?q=", whitespace: "+"},
    {name: "DuckDuckGo", url: "https://www.duckduckgo.com", search: "/?q=", whitespace: "+"},
    {name: "Ecosia", url: "https://www.ecosia.org", search: "/search?q=", whitespace: "%20"},
  ];

  engine = this.engines[0];

  constructor() {
    const engine = localStorage.getItem("engine");
    if (engine) {
      this.engine = JSON.parse(engine);
    }
  }

  search() {
    console.log("searching")
    const url =
      this.engine.url +
      this.engine.search +
      this.value.replace(" ", this.engine.whitespace);
    window.open(url,"_self");
    this.value = "";
  }

  getIcon(url: string): string {
    return "https://s2.googleusercontent.com/s2/favicons?domain=" + url;
  }

  saveEngine(engine: SearchEngine) {
    localStorage.setItem("engine", JSON.stringify(engine));
  }
}

interface SearchEngine {
  search: string;
  name: string;
  whitespace: string;
  url: string
}
