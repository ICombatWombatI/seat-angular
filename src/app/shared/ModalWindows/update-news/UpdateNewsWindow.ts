import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NewsService } from '../../../service/news/news.service';
import { CNews } from '../../../shared/classes/news';

@Component({
  selector: 'UpdateNewsWindow',
  templateUrl: './UpdateNewsWindow.html',
  styleUrls: ['./UpdateNewsWindow.css']
})

export class UpdateNewsWindow implements OnInit {

  constructor( public dialogRef: MatDialogRef<UpdateNewsWindow>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private router: Router,
               private NewsService: NewsService,
  ) { }

  confirm: boolean = true;
  file: File;
  news_id: number;
  img_name: string = "";
  news_title: string = "";
  news_description: string = "";
  img_selected: boolean = false;
  news: CNews [] = [];

  ngAfterContentChecked() {
  //Called after every check of the component's view. Applies to components only.
  //Add 'implements AfterViewChecked' to the class.
 
  if (this.news === null) {
    //this.data_is_came = 3;
    this.news = [];
  } else if (this.news.length) {
    this.news_title =this.news[0].news_title;
    this.news_description =this.news[0].news_description;
  
   // this.data_is_came = 1;
  }
}
  ngOnInit() {
    this.news_id = this.data.news_id;
    this.getNews();
  }

  getNews() {
    this.NewsService.getNewsById(this.news_id).subscribe(data => this.news = data);
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