import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeneralService {
  alertEvent: Subject<Alert> = new Subject<Alert>();
  //   confirmEvent: Subject<Confirm> = new Subject<Confirm>();
  loaderEvent: Subject<boolean> = new Subject<boolean>();

  constructor() {}
}

export interface Alert {
  title?: string;
  text: string;
  onOk?: Function;
  onCancel?: Function;
}
