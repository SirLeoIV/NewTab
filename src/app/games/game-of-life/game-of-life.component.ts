import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent  implements OnInit {

  game: boolean[][] = [[]];
  interval: any;

  size = 24;

  speed = 1;

  gameActive = false;

  keyDown = false;

  ngOnInit(): void {
    this.initGame()
    this.gameActive = false;
    this.interval = setInterval(() => {
      if (this.gameActive) {
        this.nextIteration();
      }
    }, 300);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.keyDown && (event.key == "ArrowRight" || event.key == "d")) {
      this.nextIteration()
      this.keyDown = true;
    }

    if (event.key == " ") {this.gameActive = !this.gameActive}
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    if ((event.key == "ArrowRight" || event.key == "d")) {this.keyDown = false}
  }

  private nextIteration() {
    let newGame: boolean[][] = [];
    for (let i = 0; i < this.game.length; i++) {
      let row = this.game[i];
      newGame.push([]);
      for (let j = 0; j < row.length; j++) {
        let neighbors = this.getNeighbors(i, j);
        let countAliveNeighbors = 0;
        for (let neighbor of neighbors) {
          if (this.game[neighbor[0]][neighbor[1]]) {
            countAliveNeighbors++;
          }
        }
        if (this.game[i][j]) {
          if (countAliveNeighbors < 2 || countAliveNeighbors > 3) {
            newGame[i][j] = false;
          } else {
            newGame[i][j] = true;
          }
        } else {
          if (countAliveNeighbors == 3) {
            newGame[i][j] = true;
          } else {
            newGame[i][j] = false;
          }
        }
      }
    }
    this.game = newGame;
  }

  private getNeighbors(i: number, j: number): number[][] {
    let neighbors: number[][] = [];
    if (i > 0) neighbors.push([i - 1, j]);
    if (i < this.size - 1) neighbors.push([i + 1, j]);
    if (j > 0) neighbors.push([i, j - 1]);
    if (j < this.size - 1) neighbors.push([i, j + 1]);
    if (i > 0 && j > 0) neighbors.push([i - 1, j - 1]);
    if (i > 0 && j < this.size - 1) neighbors.push([i - 1, j + 1]);
    if (i < this.size - 1 && j > 0) neighbors.push([i + 1, j - 1]);
    if (i < this.size - 1 && j < this.size - 1) neighbors.push([i + 1, j + 1]);

    return neighbors;
  }

  private initGame() {
    this.game = [];
    for (let i = 0; i < this.size; i++) {
      let row: boolean[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push(false);
      }
      this.game.push(row);
    }
  }

  clickOnCell(i: number, j: number) {
    this.game[i][j] = !this.game[i][j];
  }
}
