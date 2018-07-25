import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';
import { CCategories } from '../../shared/classes/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CCategories[]> {
    const headers = CHelpers.setHeader();

      return this.http.get( host.url + '/categories/getcategories',{headers}).pipe(map(data=>{
          let categoriesList = data["categories"];
          return categoriesList.map(function(data:any) {
              return {
                category_id: data.category_id,
                category_name: data.category_name
              };
            });
          }),catchError(CHelpers.handleError));
  }

  createCategory(category_name ): Observable<CCategories[]> {
    const headers = CHelpers.setHeader();
    let data =  {"category_name":category_name };

      return this.http.get( host.url + '/categories/createcategory',{headers, params:data}).pipe(map(data=>{
          let categoriesList = data["categories"];
          return categoriesList.map(function(data:any) {
              return {
                category_id: data.category_id,
                category_name: data.category_name
              };
            });
          }),catchError(CHelpers.handleError));
  }
}
