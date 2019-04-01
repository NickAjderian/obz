import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-obs-report',
  templateUrl: './obs-report.page.html',
  styleUrls: ['./obs-report.page.scss'],
})
export class ObsReportPage implements OnInit {
  public report: any;
  public ward_id: string;
  public start_time: Date;
  public end_time: Date;

  constructor(public data: DataService) { }

  ngOnInit() {
    // TODO: propert shift start times

    const h: number = Math.floor(new Date().getHours() / 8) * 8; // shift end
    let d1: Date = new Date();
    d1.setHours(h); // end of shift
    d1.setMinutes(0);
    d1.setSeconds(0);
    d1.setMilliseconds(0);
    d1 = new Date(d1.valueOf() - 8 * 3600 * 1000); // shift start 8 hrs before
    this.start_time = d1;

    this.shiftStartTime(0); // set start and end time

  }

  shiftStartTime(delta: number) {
    this.start_time = new Date(this.start_time.valueOf() + delta * 3600 * 1000);
    this.end_time =  new Date(this.start_time.valueOf() + 8 * 3600 * 1000);
    this.refresh();
  }

  public refresh() {
    const me = this;
    this.data.getObsReport(this.data.currentWardId, this.start_time, this.end_time).then(
      // no op, data is all in data.obsReport
    );
  }



}
