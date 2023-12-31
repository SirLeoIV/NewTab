import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  reloadTrigger$: Subject<number> = new Subject();
  newBackgroundTrigger$: Subject<number> = new Subject();

  constructor() { }

  triggerReload() {
    this.reloadTrigger$.next(0);
  }

  triggerNewBackground() {
    this.newBackgroundTrigger$.next(0);
  }
}
