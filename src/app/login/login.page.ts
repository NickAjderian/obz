import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;

  constructor(public data: DataService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    // check email, pwd
    this.data.loginWithEmailAndPassword(this.email, this.password);
    if (this.data.authId) {
      this.router.navigate(['/']);
    }
  }

}
