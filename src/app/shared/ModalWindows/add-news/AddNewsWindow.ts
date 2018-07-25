import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'AddNewsWindow',
  templateUrl: './AddNewsWindow.html',
  styleUrls: ['./AddNewsWindow.css']
})

export class AddNewsWindow implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddNewsWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) { }

  confirm: boolean = true;
  file: File;
  img_name: string = "";
  news_title: string = "";
  img_selected: boolean = false;
  news_description: string = "";
  ngOnInit() {
  }
  uploadImg(event) {
    this.file = event.target.files.item(0);
    if ((this.file.type.match('image/jpeg') || this.file.type.match('image/png')) && this.file.size < 1000000) {
      //this.stadium_data.append('T_IMG', this.file, this.file.name);
      this.img_name = this.file.name;
      this.img_selected = !this.img_selected;
    } else {
      alert('Invalid format of the file or size is to big!');
    }
  }

  deleteImg() {
   /// this.stadium_data.delete('T_IMG');
    this.img_selected = !this.img_selected;
  }

  createNews() {
    this.news_title = this.news_title.replace(/^\s*/, '').replace(/\s*$/, '');

    if (this.news_title!== "" && this.img_selected) {
      //this.stadium_data.append('news_title', this.news_title);
    } else {
      alert("Select title img");
    }
  }

  close() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}