import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';

import { CStadium } from '../../shared/classes/stadium';

@Injectable({
  providedIn: 'root'
})

export class StadiumService {

 
  constructor(private http: HttpClient , private router:Router ) {}

  getStadiumsCount() {
    const headers = CHelpers.setHeader();

      return this.http.get(  host.url + '/stadiums/getstadiumscount',{headers}).pipe(map(data=>{
        return  data;
      }),catchError(CHelpers.handleError));
  }

 // Stadium data By Id
  getStadiumById(_id: any): Observable<CStadium[]> {
    const headers = CHelpers.setHeader();

    let params = new HttpParams().set("stadium_id", _id);
    
      return this.http.get( host.url + '/stadiums/getstadiumbyid',{headers, params:params}).pipe(map(data=>{
          let usersList = data["stadium"];
          return usersList.map(function(data:any) {
              return {
                stadium_id: data.stadium_id,                    // id
                stadium_name: data.stadium_name,                // name
                stadium_featured_url: "http://4ei.store/" + data.stadium_featured_url, // img url
                city_id: data.city_id,                          // img url
              };
            });
          }),catchError(CHelpers.handleError));
  }
 // Stadium list
  getStadiums(page:any): Observable<CStadium[]> {

  const headers = CHelpers.setHeader();

  let params = new HttpParams().set("page", page);

    return this.http.get( host.url + '/stadiums/getstadiums',{headers, params:params}).pipe(map(data=>{
        let usersList = data["stadiums"];
        return usersList.map(function(data:any) {
            return {
              stadium_id: data.stadium_id,                    // id
              stadium_name: data.stadium_name,                // name
              stadium_featured_url: "http://4ei.store/" + data.stadium_featured_url, // img url
              city_id: data.city_id,                          // img url
            };
          });
        }),catchError(CHelpers.handleError));
 }

deleteStadium(stadium_id: number) {
  const headers = CHelpers.setHeader();

  this.http.post(host.url + '/stadiums/deletestadium', {stadium_id: stadium_id}, {headers}).subscribe((resp: any) => {
    return resp.message;
  },catchError(CHelpers.handleError));
}

createStadium(stadium_data: any): Observable<CStadium[]> {
  const headers = CHelpers.setHeader();

  return this.http.post( host.url + '/stadiums/createstadium',stadium_data, {headers}).pipe(map(data=>{
    let stadiums = data["stadiums"];
    return stadiums.map(function(data:any) {
        return {
          stadium_id: data.stadium_id,                    // id
          stadium_name: data.stadium_name,                // name
          stadium_featured_url: "http://4ei.store/" + data.stadium_featured_url, // img url
          city_id: data.city_id,                          // img url
        };
      });
    }),catchError(CHelpers.handleError));
}


updateStadium(stadium_data: any): Observable<CStadium[]> {
  const headers = CHelpers.setHeader();
 
  return this.http.post( host.url + '/stadiums/updatestadium',stadium_data,{ headers}).pipe(map(data=>{
    let stadium = data["stadium"];
    return stadium.map(function(data:any) {
        return {
          stadium_id: data.stadium_id,                    // id
          stadium_name: data.stadium_name,                // name
          stadium_featured_url: "http://4ei.store/" + data.stadium_featured_url, // img url
          city_id: data.city_id,                          // img url
        };
      });
    }),catchError(CHelpers.handleError));
}
}
