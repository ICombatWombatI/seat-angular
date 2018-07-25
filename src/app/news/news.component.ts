import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddNewsWindow } from '../shared/ModalWindows/add-news/AddNewsWindow';
import { UpdateNewsWindow } from '../shared/ModalWindows/update-news/UpdateNewsWindow'

import { CNews } from '../shared/classes/news';
import { NewsService } from '../service/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor( public dialog: MatDialog,
               private NewsService: NewsService
  ) { }

  news: CNews[] = [];
  data: number = 4;

  ngAfterContentChecked() {
    if (this.news === null) {
      this.data = 3;
      this.news = [];
    } else if (this.news.length) {
      this.data = 1;
    }
  }

  ngOnInit() {
    this.getNews();
  }

  openNews(news_id) {
    let dialogRef = this.dialog.open(UpdateNewsWindow, {
      data: { news_id:news_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      } 
    });
  }

  addNews() {
    let dialogRef = this.dialog.open(AddNewsWindow, {
      data: {  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }
  getNews() {
    this.NewsService.getNews().subscribe(data => this.news = data);
  }

  deleteNews(index: number, id_news: number) {
    // this.NewsService.deleteNews(id_news);
    //  this.stadiums.splice(index, 1);
  }

}
