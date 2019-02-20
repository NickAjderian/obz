import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-add',
  templateUrl: './ward-add.page.html',
  styleUrls: ['./ward-add.page.scss'],
})
export class WardAddPage implements OnInit {
  public wardName: string;


  constructor(public data: DataService) { }

  ngOnInit() {
  }

  onCreate(newWard: string) {
    this.data.addWard(newWard);
  }

}
