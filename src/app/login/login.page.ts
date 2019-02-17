import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    // check email, pwd
    // this.data.loginWithEmailAndPassword(this.email, this.password);
    // if (this.data.authId) {
    //   this.router.navigate(['/']);
    // }
  }

}
