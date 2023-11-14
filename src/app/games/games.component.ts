import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  gamesOpen: boolean = false;
  selectedGame: number = 1;

  ngOnInit(): void {
    this.gamesOpen = localStorage.getItem("gamesOpen" || "false") == "true";
    this.selectedGame = parseInt(localStorage.getItem("selectedGame") || "1");
  }

  toggleGames() {
    this.gamesOpen = !this.gamesOpen;
    localStorage.setItem("gamesOpen", this.gamesOpen.toString());
  }

  selectGame(game: number) {
    this.selectedGame = game;
    localStorage.setItem("selectedGame", game.toString());
  }
}
