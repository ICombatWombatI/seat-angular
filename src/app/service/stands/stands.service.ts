import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';

import { CStands } from '../../shared/classes/stands';


@Injectable({
  providedIn: 'root'
})
export class StandsService {

  constructor(private http: HttpClient , private router:Router ) {}

  createStand(stadium_id: any, stand_name: string ): Observable<CStands[]> {
    const headers = CHelpers.setHeader();
    let data =  {"stadium_id":stadium_id , "stand_name":stand_name};

      return this.http.get( host.url + '/stands/createstand',{headers, params:data}).pipe(map(data=>{
          let standList = data["stands"];
          return standList.map(function(data:any) {
              return {
                stand_id: data.stand_id,
                stadium_id: data.stadium_id,
                stand_name: data.stand_name,
              };
            });
          }),catchError(CHelpers.handleError));
  }

  getStands(_id: any): Observable<CStands[]> {
    const headers = CHelpers.setHeader();
  
    let params = new HttpParams().set("stadium_id", _id);

      return this.http.get( host.url + '/stands/getstands',{headers, params:params}).pipe(map(data=>{
          let usersList = data["stands"];
          return usersList.map(function(data:any) {
              return {
                stand_id: data.stand_id,
                stadium_id: data.stadium_id,
                stand_name: data.stand_name,
              };
            });
          }),catchError(CHelpers.handleError));
  }

  deleteStand(stand_data: any) {
    const headers = CHelpers.setHeader();
  
    this.http.post(host.url + '/stands/deletestand', stand_data, {headers}).subscribe((resp: any) => {
      return resp.message;
    },catchError(CHelpers.handleError));
  }
}
