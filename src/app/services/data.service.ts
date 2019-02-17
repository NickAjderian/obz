import { Injectable, OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  public authId: string;
  public trustName: string;
  public nurses: any [];
  public wards: any[];
  public currentWard: any;
  public color: string;

  ngOnDestroy(): void {
    console.log('exterminate!');
  }


  constructor() {
    this.trustName = 'CareSUs';
    this.nurses = [
      {nurse_id: 'admin01', nurse_name: 'Monty Burns', is_admin: true, is_manager: true},
      {nurse_id: 'nurse01', nurse_name: 'Marge Simpson', is_admin: false, is_manager: false}
    ];

    this.wards = [
      { ward_id: 'ward01', ward_name: 'Apple',
      patients: [
        {patient_id: 'patient01', patient_name: 'fred flintstone',
        level: 2, observe_every: 5,
        observations: [
          {time: '2019-02-17T13:00', observed_by: 'nurse01'}
        ]},
        {patient_id: 'patient02', patient_name: 'wilma flintstone',
        level: 1, observe_every: 30,
        observations: [
          {time: '2019-02-17T13:05', observed_by: 'nurse01'}
        ]},
      ]
    },
      { ward_id: 'ward02', ward_name: 'Blackberry'},
      { ward_id: 'ward03', ward_name: 'Cucumber'}
    ];

    this.currentWard = this.wards[0];
    this.color = 'blue';
  }

  registerWithGoogle() {

  }
  registerWithEmailAndPassword(email: string, password: string, confirm_password: string, tel: string) {

  }
  logOut() {
    this.onLogOut();
  }
  onLogIn() {
  }
  onLogOut() {
    this.authId = null;
  }
  loginWithGoogle() {

  }

  loginWithEmailAndPassword(email: string, password: string) {
    if (email.match('b')) {
      this.authId = 'admin01';
      this.onLogIn();
    } else if (email.match('g')) {
      this.authId = 'nurse01';
      this.onLogIn();
    }


  }
  setTrustName(new_name: string) {

  }
  addWard(ward_name: string) {

  }
  renameWard(ward_id: string, new_name: string ) {

  }
  removeWard(ward_id: string) {

  }
  setWardCode(ward_id: string, ward_code: string) {

  }
  removeWardNurse(ward_id: string, nurse_id: string) {

  }
  addPatient(ward_id: string, patient_name: string, observation_level: string) {

  }
  removePatient(ward_id: string, patient_id: string) {

  }
  observePatient(ward_id: string, patient_id: string) {

  }








}