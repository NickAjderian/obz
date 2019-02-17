import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-view-options',
  templateUrl: './ward-view-options.page.html',
  styleUrls: ['./ward-view-options.page.scss'],
})
export class WardViewOptionsPage implements OnInit {
  private _currentWardId: string;
  constructor(public data: DataService) { }

  ngOnInit() {
  }
  public get currentWardId (): string {
    this._currentWardId = this.data.currentWard.ward_id;
    return this._currentWardId;
  }
  public set currentWardId (value: string) {
    this._currentWardId = value;
    this.data.currentWard = this.data.wards.filter(w => w.ward_id === this._currentWardId)[0];
  }

}
