import {Component} from '@angular/core';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss']
})
export class RunnerComponent {

  y: number = 20;

  floors: number[] = [0, 12, 24, 36, 48, 60, 72, 84];

  jump: boolean = false;
  duck: boolean = false;


  getHitBox(): number[] {
    return (this.duck) ? [this.y, this.y + 4] : [this.y, this.y + 8];
  }

}
