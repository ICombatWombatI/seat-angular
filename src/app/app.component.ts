import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  auth: boolean = true;

  ngAfterViewChecked() {

    if(localStorage.getItem('token')!=null) {
    } else {
      localStorage.setItem('token', null);
      return false;
    }

    let sing = localStorage.getItem('token');
    if( sing === 'null' ) {
      this.auth = false;
    } else if(sing ==='') {
      this.auth = false;
    } else {
      this.auth = true;
    }

  }
}
