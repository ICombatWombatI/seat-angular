import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

import { CNews } from '../../shared/classes/news';
import { CError } from '../../shared/error/error';
import { host } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  updateNews(news_data: any) {
    const headers = this.setHeader();

    this.http.post(host.url + '/news/updatenews', { news_data: news_data }, { headers }).subscribe((resp: any) => {
      return resp.message;
    }, catchError(this.handleError));
  }

  deleteNews(news_id: number) {
    const headers = this.setHeader();

    this.http.post(host.url + '/news/deletenews', { news_id: news_id }, { headers }).subscribe((resp: any) => {
      return resp.message;
    }, catchError(this.handleError));
  }

  getNewsById(news_id: any): Observable<CNews[]> {
    const headers = this.setHeader();
    console.log(news_id);
    let params = new HttpParams().set("id", news_id);
    // http://35.178.89.178:3000/admin-api/news/ - амазон 
    return this.http.get('http://35.178.89.178:3000/admin-api/news/' + news_id, { headers }).pipe(map(data => {

     let  List = [data["news"]];
      console.log(List);
      return List.map(function (data: any) {
        return {
          news_id: data.id,
          news_image: data.image,
          news_title: data.title,
          news_description: data.description,
        };
      });
    }));
  }

  getNews(): Observable<CNews[]> {
    const headers = this.setHeader();
  // http://35.178.89.178:3000/admin-api/news/ - амазон 
    return this.http.get('http://35.178.89.178:3000/admin-api/news/all', { headers }).pipe(map(data => {

      let List = data["newsList"];
      return List.map(function (data: any) {
        return {
          news_id: data.id,
          news_image: data.image,
          news_title: data.title,
          news_description: data.description,
        };
      });
    }), catchError(this.handleError));
  }

  setHeader() {
    return new HttpHeaders()
      .set("Seat-Excess-Header", localStorage.getItem('token'));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
