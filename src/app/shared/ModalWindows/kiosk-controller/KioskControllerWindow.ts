import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'KioskControllerWindow',
  templateUrl: './KioskControllerWindow.html',
  //styleUrls: ['./modal-window.component.css']
})

export class KioskControllerWindow implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<KioskControllerWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router) { }

    ngOnInit() {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}