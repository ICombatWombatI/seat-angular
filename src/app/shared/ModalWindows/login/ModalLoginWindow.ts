import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ModalLoginWindow',
  templateUrl: './ModalLoginWindow.html',
  //styleUrls: ['./modal-window.component.css']
})

export class ModalLoginWindow implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalLoginWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router) { }

    ngOnInit() {
    }

  onNoClick(): void {
    this.router.navigate(['/stadiums']);
    this.dialogRef.close();
  }
}