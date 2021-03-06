import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public AuthService: AuthService) {
  }

  onSubmit () {
    this.AuthService.logOut();
  }

  ngOnInit() {

  }

}
