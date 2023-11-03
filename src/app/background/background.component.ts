import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {

  constructor(private http: HttpClient) {}


}
