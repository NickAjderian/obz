import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public data: DataService) {

  }

  public onChangeColor(ev: any) {
    console.log('changed color');
    console.log(JSON.stringify(this.data));
  }

  public floor(v: number): number {
    return Math.floor(v);
  }

}
