import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ModalWindow',
  templateUrl: './ModalWindow.html',
  //styleUrls: ['./modal-window.component.css']
})

export class ModalWindow implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router) { }

    confirm: boolean = true;

    ngOnInit() {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}