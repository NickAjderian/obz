import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email: string;
  public password: string;
  public confirmPassword: string;
  public mobile: string;

  constructor(public data: DataService) { }

  ngOnInit() {
  }

  registerWithEmailAndPassword(email: string, password: string, confirmPassword: string, mobile: string) {
    this.data.registerWithEmailAndPassword(email, password, confirmPassword, mobile);

  }
}
