import {Component, HostListener, OnInit} from '@angular/core';
import {Action, State} from "./model";

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss']
})
export class RunnerComponent implements OnInit {

  x: number = 50;
  y: number = 0;
  speed: number = 1000; // how much time it takes for the scene to run from right to left
  width: number = 300;

  gameTime: number = 0;

  floorCount: number = 8;
  floors: number[] = [0, 12, 24, 36, 48, 60, 72, 84];
  activeFloors: boolean[] = [true, false, true, false, true, false, true, false];

  lastSceneSwitch: number = 0;
  sceneSwitchInterval: number = 5000;


  gameActive = false;

  action: Action = Action.NONE;
  state: State = State.RUNNING;

  jumpStartTime: number = 0;
  jumpStartFloor: number = 0;

  fallStartTime: number = 0;
  fallStartHeight: number = 0;

  currentFloor: number = 0;

  interval: any;

  ngOnInit(): void {
    this.gameActive = false;
    this.interval = setInterval(() => {
      if (this.gameActive) {
        this.gameTime += 20;
        this.gameMethod();
      }
    }, 20);
  }


  getHitBox(): number[] {
    return (this.state == State.DUCKING) ? [this.y, this.y + 4] : [this.y, this.y + 8];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardDownEvent(event: KeyboardEvent) {
    if (event.key == "ArrowUp" || event.key == "w") {this.action = Action.JUMP}
    if (event.key == "ArrowDown" || event.key == "s") {this.action = Action.DUCK}
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    if (event.key == "ArrowUp" || event.key == "w") {this.action = Action.NONE}
    if (event.key == "ArrowDown" || event.key == "s") {this.action = Action.NONE}

    if (event.key == " " || event.key == "Enter") {this.gameActive = !this.gameActive}
  }

  private gameMethod() {
    this.switchScene();
    if (this.action == Action.JUMP && this.state == State.RUNNING) {
      this.state = State.JUMPING
      this.jumpStartFloor = this.currentFloor;
      this.jumpStartTime = this.gameTime;
    }
    if (this.action == Action.DUCK && this.state == State.RUNNING) {this.state = State.DUCKING}
    if (this.action == Action.NONE && this.state == State.DUCKING) {this.state = State.RUNNING}

    if (this.state == State.JUMPING) {
      let timeSinceJumpStart = this.gameTime - this.jumpStartTime;
      if (timeSinceJumpStart > 500) {
        this.state = State.FALLING;
        this.fallStartTime = this.gameTime;
        this.fallStartHeight = this.y;
      } else this.y = this.getCurrentJumpHeight(timeSinceJumpStart / 1000);
    }
    if (this.state == State.FALLING) {
      let timeSinceFallStart = this.gameTime - this.fallStartTime;
      this.y = this.getCurrentFallHeight(timeSinceFallStart / 1000);
      if (this.touchFloor()) {
        this.state = State.RUNNING;
      }
    }
    if (this.state == State.RUNNING) {
      this.y = this.floors[this.currentFloor];
    }
    if (this.state == State.DUCKING) {
      this.y = this.floors[this.currentFloor];
    }

    this.enterFloor();
  }

  getCurrentJumpHeight(x: number): number {
    let currentFloorHeight = this.floors[this.jumpStartFloor];
    let f_x = - Math.pow(8 * (x-0.5), 2) + 16;
    return currentFloorHeight + f_x;
  }

  getCurrentFallHeight(x: number): number {
    return this.fallStartHeight - Math.pow(8*x, 2);
  }

  touchFloor(): boolean {
    return this.y < this.floors[this.currentFloor];
  }

  enterFloor() {
    for (let i = 0; i < this.floorCount; i++) {
      if (this.y >= this.floors[i] && this.activeFloors[i]) {
        this.currentFloor = i;
      }
    }
  }

  private switchScene() {
    if (this.gameTime - this.lastSceneSwitch > this.sceneSwitchInterval) {
      this.lastSceneSwitch = this.gameTime;
      this.sceneSwitchInterval = (Math.random() * 6 + 3) * 1000;
      this.activeFloors = this.activeFloors.map((value) => !value);
      if (this.state != State.JUMPING) {
        this.state = State.FALLING;
        this.fallStartTime = this.gameTime;
        this.fallStartHeight = this.y;
      }
    }
  }

  protected readonly State = State;

  getLeftOfFloor(i: number) {
      if (this.activeFloors[i]) {
        let timeSinceSceneSwitch = this.gameTime - this.lastSceneSwitch;
        return (Math.max(0,
          (this.x - ((timeSinceSceneSwitch / this.speed) * (this.width - this.x)))))
      } else {
        if (this.gameTime - this.lastSceneSwitch > this.speed / this.width * this.x) { // if the floor has just passed the player
          let timeLeftUntilNextSwitch = this.sceneSwitchInterval - (this.gameTime - this.lastSceneSwitch);
          return (Math.max(0,
            (this.x + ((timeLeftUntilNextSwitch / this.speed) * (this.width - this.x)))));
        } else {
          return 0;
        }
      }
  }

  getWidthOfFloor(i: number) {
    let left = this.getLeftOfFloor(i);
    if (this.activeFloors[i]) {
      let timeLeftUntilNextSwitch = this.sceneSwitchInterval - (this.gameTime - this.lastSceneSwitch);
      return (Math.min(this.width - left,
        Math.max(0,
          (this.x + ((timeLeftUntilNextSwitch / this.speed) * (this.width - this.x)) - left))))
    } else {
      if (this.gameTime - this.lastSceneSwitch > this.speed / this.width * this.x) { // if the floor has just passed the player
        return (Math.min(this.width - left,
          (this.width - left)));
      } else {
        let timeSinceSceneSwitch = this.gameTime - this.lastSceneSwitch;
        return (Math.max(0,
          (this.x - ((timeSinceSceneSwitch / this.speed) * (this.width - this.x)))))
      }
    }
  }
}
