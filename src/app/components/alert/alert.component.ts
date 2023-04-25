import { Component, ViewChild } from '@angular/core';
import { Alert, GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  alert: Alert;
  @ViewChild('alertTemplate')
  alertTemplate: any;
  alertTemplateRef: any;

  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.generalService.alertEvent.subscribe((alert: Alert) => {
      this.alert = alert;
      this.alertTemplateRef = this.dialog.open(this.alertTemplate, {
        disableClose: true,
        minWidth: '350px',
      });
    });
  }

  ok() {
    this.alert.onOk && this.alert.onOk();
    this.alertTemplateRef.close();
  }

  cancel() {
    this.alert.onCancel && this.alert.onCancel();
    this.alertTemplateRef.close();
  }
}
