import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-view-options',
  templateUrl: './ward-view-options.page.html',
  styleUrls: ['./ward-view-options.page.scss'],
})
export class WardViewOptionsPage implements OnInit {
  public _currentWardId: string;
  constructor(public data: DataService) { }

  ngOnInit() {
    this._currentWardId = this.data.currentWardId;
  }

  public get currentWardId (): string {
    this._currentWardId = this.data.currentWardId;
    return this._currentWardId;
  }
  public set currentWardId (value: string) {
    console.log('setting currnet ward to ' + value);
    this._currentWardId = value;
    this.data.currentWardId = value;
  }

}
