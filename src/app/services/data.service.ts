import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { auth } from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonItemSliding } from '@ionic/angular';
import { Ward, Patient, ObservationLevel, Observation } from '../models/models';
import * as firebase from 'firebase';


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
  private _currentFilter: string;
  public color: string;
  public timestamp: number;
  public isAdmin: boolean;
  public isManager: boolean;

  public wardsSnapshot: Ward[];
  public currentWardSnapshot: Ward;

  private wardSubscription: Subscription;

  public functionsApi = 'https://us-central1-flikkhellofirebase.cloudfunctions.net/';
  public functionsApi0 = 'http://localhost:5000/flikkhellofirebase/us-central1/';

  public userSettings: any = {};

  public levels: ObservationLevel[] = [
    { id: 1, level: 1, name: '1/60', observe_every: 60},
    { id: 2, level: 2, name: '2/30', observe_every: 30},
    { id: 3, level: 2, name: '2/20', observe_every: 20},
    { id: 4, level: 2, name: '2/15', observe_every: 15},
    { id: 5, level: 2, name: '2/10', observe_every: 10},
    { id: 8, level: 3, name: '3 (eyesight)', observe_every: 60},
    { id: 9, level: 4, name: '4 (arms-length)', observe_every: 60}
  ];

  public filters: any[] = [
    { name: 'index_wn', description: 'Name'},
    { name: 'index_wln', description: 'Name, Leave'},
    { name: 'index_wlan', description: 'Name, Leave, Alert'}
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

    const s = localStorage.getItem('userSettings');
    if (s != null && s !== '') {
      try {
        this.userSettings = JSON.parse(s);
      } catch {
      }
    }

    if (!this.userSettings) {
      this.userSettings = {};
    }

  }

    updateTimestamp() {
    this.timestamp = new Date().valueOf();
  }

  saveUserSettings() {
    localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
  }


  ngOnDestroy(): void {
    console.log('exterminate!');
  }

  public get currentFilter(): string {
    return this._currentFilter;
  }

  public set currentFilter(value: string) {
    this._currentFilter = value;
    this.userSettings.currentFilter = value;
    this.saveUserSettings();
    this.getPatients();
  }

  public get currentWardName(): string {
    return this._currentWardName;
  }

  public get currentWardId(): string {
    return this._currentWardId;
  }

  public set currentWardId(value: string) {
    this._currentWardId = value;
    if (this.wardsSnapshot && this.wardsSnapshot.length && value) {
      this.currentWardSnapshot = this.wardsSnapshot.filter(x => x.ward_id === this.currentWardId)[0];
      this._currentWardName =  this.currentWardSnapshot.ward_name;
    }
    this.userSettings.currentWardId = value;
    this.saveUserSettings();
    if (!this._currentFilter) {
      this._currentFilter = 'index_wln';
    }

    this.getPatients();

  }

  private getPatients() {
    if (this.currentWardId && this.currentFilter) {
      this.patients = this.afStore.collection<Patient>(`wards/${this.currentWardId}/patients`
      , ref => {
        const query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        return query
        .where(this._currentFilter, '<', 'b') // exclude not on ward patients
        .orderBy(this._currentFilter);
        // .orderBy('patient_name');
      })
      .valueChanges();
    this.updateTimestamp();

    }

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

      let startupCurrentWardId = '';
      if (this.userSettings.currentWardId) {
        startupCurrentWardId = this.userSettings.currentWardId;
      }

      let setCurrentIdToNull = true;
      if (this.wardsSnapshot.length) {
        if (!startupCurrentWardId) {
          // choose the first ward
          this.currentWardId = this.wardsSnapshot[0].ward_id;
          setCurrentIdToNull = false;
        } else { // check the chosen id is still in the list
          const itms = this.wardsSnapshot.filter(x => x.ward_id === startupCurrentWardId);
          if (itms && itms.length) {
            setCurrentIdToNull = false; // ok the ward is still in the list
            this.currentWardId = startupCurrentWardId;
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
    let persistence = firebase.auth.Auth.Persistence.LOCAL;
    if (typeof(cordova) === 'undefined') {
      persistence = firebase.auth.Auth.Persistence.SESSION;
    }
    return new Promise((resolve, reject) => {
      firebase.auth().setPersistence(persistence).then(
        () => {
          this.afAuth.auth.signInWithEmailAndPassword(email, password).then(reg => {
            console.log(reg);
            this.authId = reg.user.uid;
            this.isAdmin = true;
            this.subscribeToWards();
            resolve(this.authId);
          });
        }
      ).catch((e) => {
        console.log(e);
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

  observePatient(patient: Patient, result: string, slidingItem: IonItemSliding = null) {
    if (slidingItem) {
      slidingItem.close();
    }

    const obs: Observation = {
      time: new Date(),
      result: result,
      observer: this.authId,
      patient_id: patient.patient_id,
      ward_id: this.currentWardId };
    const update: any = {
      last_observation: new Date(),
      last_observation_result: result};

    switch (result) {
      case 'discharge':
        update.is_on_ward = false;
          break;
      default:
      break;
    }

    // this.afStore.collection(`/wards/${this.currentWardId}/patients/${patient.patient_id}/observations`).add( obs ).then (o => {});
    this.afStore.collection(`/observations`).add( obs ).then (o => {});
    this.afStore.doc(`/wards/${this.currentWardId}/patients/${patient.patient_id}`).update(update);

    // this.idTokenResult

    // use new fn
    const headers  = {headers :
      new HttpHeaders({Authorization: `Bearer ${this.idToken}`})
    };

    this.http.get(
      `${this.functionsApi}addMessage?msg=New obs for ${patient.patient_name}`,
        headers
    ).subscribe(r => {
      console.log(r);
    }, (e: Error) => {
      console.log(e);
    });

    this.updateTimestamp();

  }

  patientBadgeColor(patient: Patient, timestamp: number) {
    let lastObsSeconds = (patient.last_observation as Date).valueOf() / 1000;
    if (isNaN(lastObsSeconds)) {
      lastObsSeconds = (patient.last_observation as any).seconds;
    }

    const delay = Math.floor((this.timestamp / 1000 - lastObsSeconds) / 60);

    return patient.last_observation_result === 'ok' ?
      (delay <= patient.observe_every ? 'success' : 'warning')
      : patient.last_observation_result === 'alert' ? 'danger' : 'secondary';
  }

  patientBadgeText(patient: Patient, timestamp: number) {
    let lastObsSeconds = (patient.last_observation as Date).valueOf() / 1000;
    if (isNaN(lastObsSeconds)) {
      lastObsSeconds = (patient.last_observation as any).seconds;
    }
    const delay = Math.floor((this.timestamp / 1000 - lastObsSeconds) / 60);


    return (patient.last_observation_result === 'ok' || patient.last_observation_result === 'alert') ?
      delay.toString() + '/' + (patient.observe_every).toString()
      : 'Leave';
  }

  getWardsToJoin(join_code: string): Promise<Ward[]> {
      const headers  = {headers :
        new HttpHeaders({Authorization: `Bearer ${this.idToken}`})
      };
      return new Promise((resolve, reject) => {
        this.http.get(
          `${this.functionsApi}getWardsToJoin?join_code=${join_code}`,
            headers
        ).subscribe(
          (ww: any) => {
            resolve(ww as Ward[]);
          },
          e => {
            console.log(e);
          }
        );
      });
  }

  joinWard(join_code: string, ward_id: string, nurse_id: string = null, permission: string = 'nurse') {
    const headers  = {headers :
      new HttpHeaders({Authorization: `Bearer ${this.idToken}`})
    };
    return new Promise((resolve, reject) => {
      this.http.get(
        `${this.functionsApi}`
          + `joinWard?join_code=${join_code}&ward_id=${ward_id}&nurse_id=${nurse_id}&permission=${permission}`,
        headers
      ).subscribe(
        r => resolve(r),
        e => reject(e)
      );
    });
  }

  leaveWard(ward_id: string, nurse_id: string = null) {
    const headers  = {headers :
      new HttpHeaders({Authorization: `Bearer ${this.idToken}`})
    };
    return new Promise((resolve, reject) => {
      this.http.get(
        `${this.functionsApi}`
          + `joinWard?join_code=&ward_id=${ward_id}&nurse_id=${nurse_id}&permission=leave`,
        headers
      ).subscribe(
        r => resolve(r),
        e => reject(e)
      );
    });
  }

  getObsReport(ward_id: string, start_time: Date, end_time: Date) {
    const headers  = {headers :
      new HttpHeaders({Authorization: `Bearer ${this.idToken}`})
    };
    return new Promise((resolve, reject) => {
      this.http.get(
        `${this.functionsApi}getObsReport?ward_id=${ward_id}&start_time=${start_time}&end_time=${end_time}`,
          headers
      ).subscribe(
        (ww: any) => {
          resolve(ww);
        },
        e => {
          console.log(e);
        }
      );
    });
  }

}
