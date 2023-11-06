import {Component, OnInit} from '@angular/core';
import {ObservableService} from "../observable.service";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit{

  background: string = "'../assets/images/Background (5).jpg'";
  backgroundId: number = 5;

  constructor(private observableService: ObservableService) {
    this.observableService.newBackgroundTrigger$.subscribe(() => {
      this.setRandomBackground();
    });
  }

  ngOnInit(): void {
    this.backgroundId = localStorage.getItem("backgroundId") ? parseInt(localStorage.getItem("backgroundId")!) : 5;
    this.setBackGround(this.backgroundId);
    let lastChange = localStorage.getItem("lastBackgroundChange");
    if (lastChange == null || lastChange != new Date().getDay().toString()) {
      this.setRandomBackground();
    }
  }

  setRandomBackground() {
    let index = Math.floor(Math.random() * 89) + 1;
    this.setBackGround(index);
    localStorage.setItem("backgroundId", index.toString());
    localStorage.setItem("lastBackgroundChange", new Date().getDay().toString());
    location.reload();
  }

  setBackGround(id: number) {
    this.background = "'../assets/images/Background (" + id + ").jpg'";
  }

  getBackgroundStyle() {
    return {
      background: 'url(' + this.background + ')',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-position': 'center center'
    };
  }
}
