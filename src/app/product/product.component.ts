import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { ModalWindow } from '../shared/ModalWindows/modal-window/ModalWindow';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  observable: boolean = false;

  constructor(public dialog: MatDialog, 
    private router:Router
    ) { }

  ngOnInit() {
    
  }

  observeCon() {
    this.observable = true;
  }
  
  observeCre() {
    this.observable = false;
  }

}
