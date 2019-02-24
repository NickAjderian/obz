import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { auth } from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Ward {
  ward_id: string;
  ward_name: string;
  is_open: boolean;
  owner: string;
}
export interface Patient {
  patient_id: string;
  patient_number: string; // eg nhs number, optional
  patient_name: string;
  level: number; // observation level
  observe_every: number; // observations required every ... min
  last_observation: Date;
  last_observation_result: string;
  is_on_ward: boolean;
}
export interface ObservationLevel {
  id: number;
  level: number;
  name: string;
  observe_every: number;
}

export interface Observation {
  time: Date;
  result: string;
  observer: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  public authId: string;
  public idToken: string;
  public idTokenResult: auth.IdTokenResult;
  public trustName: string;
  public nurses: any [];
  public wards: Observable<Ward[]>;
  public patients: Observable<Patient[]>; // patients at currentWardId
  private _currentWardId: string;
  private _currentWardName: string;
  public color: string;
  public timestamp: number;
  public isAdmin: boolean;
  public isManager: boolean;

  public wardsSnapshot: Ward[];
  public currentWardSnapshot: Ward;

  private wardSubscription: Subscription;

  public levels: ObservationLevel[] = [
    { id: 1, level: 1, name: '1/60', observe_every: 60},
    { id: 2, level: 2, name: '2/30', observe_every: 30},
    { id: 3, level: 2, name: '2/20', observe_every: 20},
    { id: 4, level: 2, name: '2/15', observe_every: 15},
    { id: 5, level: 2, name: '2/10', observe_every: 10},
    { id: 8, level: 3, name: '3 (eyesight)', observe_every: 60},
    { id: 9, level: 4, name: '4 (arms-length)', observe_every: 60}
  ];

  constructor(public afAuth: AngularFireAuth, public afStore: AngularFirestore, public http: HttpClient) {
    this.trustName = 'CareSUs';
    this.nurses = [
      {nurse_id: 'admin01', nurse_name: 'Monty Burns', is_admin: true, is_manager: true},
      {nurse_id: 'nurse01', nurse_name: 'Marge Simpson', is_admin: false, is_manager: false}
    ];

    this.afAuth.idToken.subscribe( tok => {
      this.idToken = tok;
    });
    this.afAuth.idTokenResult.subscribe ( tr => this.idTokenResult = tr);

    setInterval(() => {
      this.updateTimestamp();
    }, 20000);
  }

    updateTimestamp() {
    this.timestamp = new Date().valueOf();
  }


  ngOnDestroy(): void {
    console.log('exterminate!');
  }

  public get currentWardName(): string {
    return this._currentWardName;
  }

  public get currentWardId(): string {
    return this._currentWardId;
  }

  public set currentWardId(value: string) {
    this._currentWardId = value;
    if (this.wardsSnapshot.length && value) {
      this.currentWardSnapshot = this.wardsSnapshot.filter(x => x.ward_id === this.currentWardId)[0];
      this._currentWardName =  this.currentWardSnapshot.ward_name;
    }
    this.patients = this.afStore.collection<Patient>(`wards/${this.currentWardId}/patients`).valueChanges();
  }

  subscribeToWards() {

    this.wardsSnapshot = [];

    this.wards = this.afStore.collection<Ward>('wards', ref => ref.orderBy('ward_name')).valueChanges();

    if (this.wardSubscription) {
      this.wardSubscription.unsubscribe();
    }
    this.wardSubscription = this.wards.subscribe( wards => {
      this.wardsSnapshot = wards;
      console.log(`updating wardsSnapshot with ${wards.length} items`);

      let setCurrentIdToNull = true;
      if (this.wardsSnapshot.length) {
        if (!this.currentWardId) {
          // choose the first ward
          this.currentWardId = this.wardsSnapshot[0].ward_id;
          setCurrentIdToNull = false;
        } else { // check the chosen id is still in the list
          const itms = this.wardsSnapshot.filter(x => x.ward_id === this.currentWardId);
          if (itms && itms.length) {
            setCurrentIdToNull = false; // ok the ward is still in the list
            }
          }
        }
      if (setCurrentIdToNull === true) {
        this.currentWardId = null; // can't find the ward
      }
    });


  }


  registerWithGoogle() {

  }
  registerWithEmailAndPassword(email: string, password: string, confirm_password: string, tel: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(reg => {
      console.log(reg);
      this.authId = reg.user.uid;
      this.isAdmin = true;
      this.subscribeToWards();
    });

  }
  logOut() {
    this.afAuth.auth.signOut().then(
      () => {
        this.authId = null;
        console.log('byee');
      }
    );
  }
  onLogIn() {
  }
  onLogOut() {
    this.authId = null;
    this.isAdmin = false;
  }
  loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(reg => {
      console.log(reg);
      this.authId = reg.user.uid;
      this.isAdmin = true;
      this.subscribeToWards();

    });

  }

  loginWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(reg => {
        console.log(reg);
        this.authId = reg.user.uid;
        this.isAdmin = true;
        this.subscribeToWards();
        resolve(this.authId);
      });
    });
  }

  setTrustName(new_name: string) {

  }
  addWard(ward_name: string) {
    const ward: Ward = {
        ward_id: null,
        ward_name: ward_name,
        is_open: true,
        owner: this.authId || null
      };
    this.afStore.collection('wards').add( ward ).then( w => {
      console.log(w);
      ward.ward_id = w.id;
      this.afStore.doc(`/wards/${w.id}`).update({ward_id: w.id});
    }, e => {
      console.log(e);
    });

  }
  renameWard(ward_id: string, new_name: string ) {

  }
  removeWard(ward_id: string) {
    this.afStore.doc(`/wards/${ward_id}`).update({is_open: false});
  }
  setWardCode(ward_id: string, ward_code: string) {

  }
  removeWardNurse(ward_id: string, nurse_id: string) {

  }
  addPatient(ward_id: string, patient_name: string, observation_level: number) {

    const patient: Patient = {
      patient_name: patient_name, level: 1, is_on_ward: true,
      last_observation_result: 'ok',
      patient_id: null,
      patient_number: null,
      observe_every: null,
      last_observation: new Date()
     };
    const levs = this.levels.filter(x => x.id.toString() === observation_level.toString());
    if (levs && levs.length) {
      patient.level = levs[0].level;
      patient.observe_every = levs[0].observe_every;
    }

    this.afStore.collection(`/wards/${this.currentWardId}/patients`).add( patient ).then (p => {
      console.log(p);
      patient.patient_id = p.id;
      this.afStore.doc(`/wards/${this.currentWardId}/patients/${p.id}`).update({patient_id: p.id});
      this.updateTimestamp();
    }, e => {
      console.log(e);
      this.updateTimestamp();
    });
  }
  removePatient(ward_id: string, patient_id: string) {
    this.afStore.doc(`/wards/${ward_id}/patients/${patient_id}`).update({is_on_ward: false});
  }

  // getIdToken() {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = this.afAuth.  .onAuthStateChanged( user => {
  //       unsubscribe();
  //       if (user) {
  //         user.getIdToken().then(idToken => {
  //           resolve(idToken);
  //         }, e => {
  //           resolve(null);
  //         });
  //       }
  //     }
  //     );
  //   });
  // }

  observePatient(patient: Patient, result: string) {
    const obs: Observation = {time: new Date(), result: result, observer: this.authId };
    this.afStore.collection(`/wards/${this.currentWardId}/patients/${patient.patient_id}/observations`).add( obs ).then (o => {
      }
    );
    this.afStore.doc(`/wards/${this.currentWardId}/patients/${patient.patient_id}`).update(
        {
          last_observation: new Date(),
          last_observation_result: result
        }
    );

    // this.idTokenResult

    // use new fn
    const headers  = {headers :
      new HttpHeaders({Authorization: `Bearer ${this.idToken}`})
    };

    // https://stackoverflow.com/a/49776653/1308736 suggests...
    // .replace(/-/g, '+').replace(/_/g, '/')


    this.http.get(
      `https://us-central1-flikkhellofirebase.cloudfunctions.net/addMessage?msg=New obs for ${patient.patient_name}`,
        headers
    ).subscribe(r => {
      console.log(r);
    }, (e: Error) => {
      console.log(e);
    });

    this.updateTimestamp();

  }








}
