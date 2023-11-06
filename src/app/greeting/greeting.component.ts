import {Component, OnInit} from '@angular/core';
import {timer} from "rxjs";
import {ObservableService} from "../observable.service";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {

  name: string = "";
  greeting: string = "";
  GREETINGS: string[] = [
    "Good morning",
    "Good day",
    "Good afternoon",
    "Good evening"
  ];

  constructor(private observableService: ObservableService) {
    this.observableService.reloadTrigger$.subscribe(() => {
      this.updateName();
    });
  }

  setGreeting() {
    let date = new Date();
    let hour = date.getHours();
    if (hour < 4) {
      this.greeting = this.GREETINGS[3];
    } else if (hour < 12) {
      this.greeting = this.GREETINGS[0];
    } else if (hour < 14) {
      this.greeting = this.GREETINGS[1];
    } else if (hour < 19) {
      this.greeting = this.GREETINGS[2];
    } else {
      this.greeting = this.GREETINGS[3];
    }
    this.greeting += ", " + this.name + ".";
  }

  ngOnInit(): void {
    this.updateName();
    timer(0, 1000).subscribe(() => {
      this.setGreeting();
    });
  }

  updateName() {
    this.name = localStorage.getItem("name") || "";
  }
}
