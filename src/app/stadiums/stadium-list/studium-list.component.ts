import { Component,Input, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { ModalWindow } from '../../shared/ModalWindows/modal-window/ModalWindow';
import { StadiumWindow } from '../../shared/ModalWindows/stadium-window/StadiumWindow';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { CStadium } from '../../shared/classes/stadium';
import { StadiumService } from '../../service/stadium/stadium.service';

@Component({
  selector: 'app-stadium-list',
  templateUrl: './studium-list.component.html',
  styleUrls: ['./studium-list.component.css']
})

export class StadiumListComponent implements OnInit {

  constructor( public dialog: MatDialog,
               private router: Router,
               public StadiumService:StadiumService
  ) { }
  data: number = 0;
  stadiums: CStadium[]= [];
  numb: any;
  priviuse: string = "true";
  next: string = "true";
  count_stadium: number = 0;
  pageIndex: number = 1;
  _id: number = 0;

  ngAfterContentChecked() {

    if(this.numb && this.count_stadium == 0) {
      this.count_stadium = this.numb.stadium_count[0].stadium_count;
      if(this.count_stadium>10) {
        this.next = "false";
      }
    }

    if( this.stadiums.length ) {
      this.data = 1;
    }
  }

  ngOnInit() {
    this.getStadiums();
    this.getStadiumsCount();
  }

  getStadiumsCount() {
    this.StadiumService.getStadiumsCount().subscribe( data => this.numb = data);
  }

  getStadiums() {
    this.StadiumService.getStadiums(this.pageIndex).subscribe( data => this.stadiums = data);
  }

  nextPage() {
    if (this.count_stadium > 10 && this.pageIndex * 10 < this.count_stadium) {
      // this.Posts=[];
      this.priviuse = "false";
      this.pageIndex++;
      if (this.pageIndex * 10 > this.count_stadium)
        this.next = "true";
        this.StadiumService.getStadiums(this.pageIndex).subscribe( data => this.stadiums = data);
    }
  }

  priviosPage() {
    if (this.pageIndex != 1) {
      // this.Posts=[];
      this.next = "false";
      this.pageIndex--;
      if (this.pageIndex == 1)
        this.priviuse = "true";
        this.StadiumService.getStadiums(this.pageIndex).subscribe( data => this.stadiums = data);
    }
  }

  createStadium() {
    let dialogRef = this.dialog.open(StadiumWindow, {
    });
    dialogRef.afterClosed().subscribe(result => {
     this.stadiums.splice(0, this.stadiums.length);
     this.StadiumService.createStadium(result).subscribe( data => this.stadiums = data);
    });
  }

  deleteStadium(index, stadium_id) {
    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: "Are you shure?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.StadiumService.deleteStadium(stadium_id);
        this.stadiums.splice(index, 1);
      } else {

      }
    });
    
  }
  overView(stadium_id:any) {
    localStorage.setItem("_id", stadium_id);
    this.router.navigate(['/over-view']);
  }
}
