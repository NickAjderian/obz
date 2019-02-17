import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-view-options',
  templateUrl: './ward-view-options.page.html',
  styleUrls: ['./ward-view-options.page.scss'],
})
export class WardViewOptionsPage implements OnInit {
  public currentWardId: string;
  constructor(public data: DataService) { }

  ngOnInit() {
    console.log(this.data.currentWard.ward_id);
    this.currentWardId = this.data.currentWard.ward_id;

  }
  onSelectWard() {
    console.log('changing ward to ' + this.currentWardId);
    this.data.currentWard = this.data.wards.filter(w => w.ward_id === this.currentWardId)[0];
    console.log(this.data.currentWard.ward_id);

  }

}
