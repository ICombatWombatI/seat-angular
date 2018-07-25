import { Component, OnInit, Inject } from '@angular/core';
import  {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalLoginWindow } from '../../shared/ModalWindows/login/ModalLoginWindow';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loading :boolean = false;
  constructor(public dialog: MatDialog,
              public AuthService: AuthService) { }

  Email:string;
  password:string;

  ngAfterContentChecked() {
    if( localStorage.getItem('auth') === 'true') {
      this.loading=true;
    } else {
       this.loading=false;
    }
  }

  ngOnInit() {

  }

  onSubmit() {
    this.AuthService.autorization(this.Email, this.password);
    localStorage.setItem('auth', 'true');
  }

}