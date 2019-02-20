import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-admin',
  templateUrl: './ward-admin.page.html',
  styleUrls: ['./ward-admin.page.scss'],
})
export class WardAdminPage implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
  }

  onClose(ward_id: string) {
    this.data.removeWard(ward_id);
  }

}
