import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { CStadium } from '../../../shared/classes/stadium';
import { StadiumService } from '../../../service/stadium/stadium.service';

@Component({
  selector: 'StadiumWindow',
  templateUrl: './StadiumWindow.html',
  styleUrls: ['./StadiumWindow.css']
})

export class StadiumWindow implements OnInit {

  constructor(public dialogRef: MatDialogRef<StadiumWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public StadiumService: StadiumService) { }

  stadium_name: string = "";
  title_img_name: string = "";
  img_selected: boolean = false;
  stadium_data: FormData;
  file: File;
  send: string = "wef";
  ngOnInit() {
    this.stadium_data = new FormData();
  }

  uploadImg(event) {
    this.file = event.target.files.item(0);
    if ((this.file.type.match('image/jpeg') || this.file.type.match('image/png')) && this.file.size < 1000000) {
      this.stadium_data.append('T_IMG', this.file, this.file.name);
      this.title_img_name = this.file.name;
      this.img_selected = !this.img_selected;
    } else {
      alert('Invalid format of the file or size is to big!');
    }
  }

  createStadium() {
    this.stadium_name = this.stadium_name.replace(/^\s*/, '').replace(/\s*$/, '');

    if (this.stadium_name !== "" && this.img_selected) {
      this.stadium_data.append('stadium_name', this.stadium_name);
    } else {
      alert("Select title img");
    }
  }

  deleteImg() {
    this.stadium_data.delete('T_IMG');
    this.img_selected = !this.img_selected;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}