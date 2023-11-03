import {Component, OnInit} from '@angular/core';
import {timer} from "rxjs";


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  timeString: string = "";

  setTimeString() {
    const time = new Date();
    const hoursString = time.getHours() < 10 ? "0" + time.getHours() : "" + time.getHours();
    const minutesString = time.getMinutes() < 10 ? "0" + time.getMinutes() : "" + time.getMinutes();
    const secondsString = time.getSeconds() < 10 ? "0" + time.getSeconds() : "" + time.getSeconds();
    this.timeString = hoursString + ":" + minutesString + ":" + secondsString;
  }


  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      this.setTimeString();
    });
  }

}
