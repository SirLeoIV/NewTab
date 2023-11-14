import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  gamesOpen: boolean = false;

  ngOnInit(): void {
    this.gamesOpen = localStorage.getItem("gamesOpen" || "false") == "true";
  }

  toggleGames() {
    this.gamesOpen = !this.gamesOpen;
    localStorage.setItem("gamesOpen", this.gamesOpen.toString());
  }
}
