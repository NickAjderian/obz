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
  public timestamp: number;

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

    setInterval(() => {
      this.timestamp = new Date().valueOf();
    }, 2000);
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
    // TODO: make me a promise
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
    this.wards.filter(x => x.ward_id === ward_id)[0]
      .patients.push({
      patient_id: (new Date()).valueOf().toString(),
      patient_name: patient_name, level: observation_level,
      observations:  []
    });
  }
  removePatient(ward_id: string, patient_id: string) {
    const ward = this.wards.filter(x => x.ward_id === ward_id)[0];
    if (ward) {
      const idx = ward.patients.findIndex(p => p.patient_id === patient_id);
      if (idx) {
        ward.patients.splice(idx, 1);
      }
    }
  }
  observePatient(patient: any, result: string) {
    if (!patient.observations) {
      patient.observations = [];
    }
    patient.observations.push({time: new Date(), observed_by: this.authId, result: result});
  }








}
