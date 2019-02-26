import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-join',
  templateUrl: './ward-join.page.html',
  styleUrls: ['./ward-join.page.scss'],
})
export class WardJoinPage implements OnInit {

  public wardsToJoin: any[];
  public joinCode: string;

  constructor(public data: DataService) { }

  async getWardsToJoin() {
    this.data.getWardsToJoin(this.joinCode).then(
      ww => this.wardsToJoin = ww
    );
  }

  joinWard(ward_id: string) {
    return new Promise((resolve, reject) => {
      this.data.joinWard(this.joinCode, ward_id, this.data.authId, 'nurse').then(
        r => resolve(r),
        e => reject(e)
      );
    });
  }

  leaveWard(ward_id: string) {
    return new Promise((resolve, reject) => {
      this.data.leaveWard(ward_id, this.data.authId).then(
        r => resolve(r),
        e => reject(e)
      );
    });
  }


  ngOnInit() {
  }

}
