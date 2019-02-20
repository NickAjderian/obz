import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ward-patients',
  templateUrl: './ward-patients.page.html',
  styleUrls: ['./ward-patients.page.scss'],
})
export class WardPatientsPage implements OnInit {
  public newPatientName: string;
  public newPatientObservationLevel: number;

  constructor(public data: DataService) { }

  ngOnInit() {
  }

  onAddPatient() {
    this.data.addPatient(this.data.currentWardId, this.newPatientName, this.newPatientObservationLevel);
    this.newPatientName = null;
    this.newPatientObservationLevel = null;
  }

}
