import {Component} from '@angular/core';
import {ObservableService} from "../observable.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  name: string = "";
  showSettings: boolean = false;

  constructor(private observableService: ObservableService) {
    this.name = localStorage.getItem('name') || "";
  }

  saveSettings() {
    localStorage.setItem('name', this.name);
    this.showSettings = false;
    this.observableService.triggerReload();
  }

  exitSettings() {
    this.name = localStorage.getItem('name') || "";
    this.showSettings = false;
  }

  toggleSettings() {
    this.showSettings ? this.exitSettings() : this.showSettings = true;
  }

}
