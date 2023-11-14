import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

  game: Array<Array<String>> = [[]];
  snake: Array<Array<number>> = [[]];
  interval: any;

  size = 12;

  headX = 10;
  headY = 10;

  orientation = "right";
  newOrientation = "right"

  cellClass = "active";

  foodX = 10;
  foodY = 15;

  increase = false;

  gameActive = false;

  score = 0;
  highScore = 0;

  ngOnInit(): void {
    this.startGame()
    this.gameActive = false;
    this.highScore = parseInt(localStorage.getItem("snakeHighScore") || "0");
    this.interval = setInterval(() => {
      this.gameMethod();
    }, 300);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.key == "ArrowDown" || event.key == "s") && this.orientation != "up") {this.newOrientation = "down"}
    if ((event.key == "ArrowUp" || event.key == "w") && this.orientation != "down") {this.newOrientation = "up"}
    if ((event.key == "ArrowRight" || event.key == "d") && this.orientation != "left") {this.newOrientation = "right"}
    if ((event.key == "ArrowLeft" || event.key == "a") && this.orientation != "right") {this.newOrientation = "left"}

    if (event.key == " " && !this.gameActive) {this.startGame()}
  }

  startGame() {
    this.gameActive = true;
    this.cellClass = "active";
    this.orientation = "right";
    this.newOrientation = "right";
    this.game = [[]];
    this.snake = [[]];
    this.headX = this.size / 2;
    this.headY = this.size / 2;
    //this.interval.timeout = this.speed * 50;

    for (let i = 0; i < this.size; i++) {
      this.game[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.game[i][j] = "off";
      }
    }

    this.foodX = this.size / 2;
    this.foodY = this.size / 2 + this.size / 4;

    this.snake[0] = [this.headX, this.headY];
    this.snake[1] = [this.headX, this.headY-1];
    this.snake[2] = [this.headX, this.headY-2];
  }

  gameMethod() {
    if (this.gameActive) {
      this.orientation = this.newOrientation;
      this.move();
      if(this.snakeContains(this.foodX, this.foodY)) {
        this.increase = true;
        this.newFood();
      }
      this.colorTheGrid();
      this.score = this.snake.length - 3;
      if(this.snakeBitesItSelf()) {
        this.gameActive = false;
        if(this.score > this.highScore) {
          this.highScore = this.score
          localStorage.setItem("snakeHighScore", this.highScore.toString());
        };
        this.cellClass = "inactive";
      }
    }
  }

  move() {
    let newSnake: Array<Array<number>> = [[]];
    let headX = this.snake[0][0];
    if (this.orientation == "up"  && headX > 0) {headX += -1}
    if (this.orientation == "down" && headX < this.size - 1) {headX += 1}
    let headY = this.snake[0][1];
    if (this.orientation == "right" && headY < this.size - 1) {headY += 1}
    if (this.orientation == "left" && headY > 0) {headY += -1}
    newSnake[0] = [headX, headY]

    for (let i = 1; i < this.snake.length; i++) {
      newSnake[i] = this.snake[i-1];
    }
    if (this.increase) {
      newSnake.push(this.snake[this.snake.length-1]);
      this.increase = false;
    }
    this.snake = newSnake;
  }

  colorTheGrid() {
    for (let i = 0; i < this.size; i++) {
      this.game[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.game[i][j] = "off";
      }
    }
    this.snake.forEach((tile) => {
      this.game[tile[0]][tile[1]] = "on";
    })
    this.game[this.foodX][this.foodY] = "food"
  }

  newFood() {
    this.foodX = -1;
    this.foodY = -1;
    while (this.foodX == -1 || this.foodY == -1 || this.snakeContains(this.foodX, this.foodY)) {
      this.foodX = this.randomIntFromInterval(this.size -1);
      this.foodY = this.randomIntFromInterval(this.size -1);
    }
  }

  randomIntFromInterval(max: number): number {
    return Math.floor(Math.random() * (max + 1))
  }

  snakeContains(x: number, y: number): boolean {
    let result = false;
    this.snake.forEach((tile) => {
      if (tile[0] == x && tile[1] == y) result = true;
    })
    return result;
  }

  snakeBitesItSelf(): boolean {
    let result = false;
    for(let i = 1; i < this.snake.length; i++) {
      if(this.snake[i][0] == this.snake[0][0] && this.snake[i][1] == this.snake[0][1]) {
        result = true;
      }
    }
    return result;
  }
}
