import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';
import { CKiosk } from '../../shared/classes/kiosk';

@Injectable({
  providedIn: 'root'
})
export class KiosksService {

  constructor(private http: HttpClient) { }

  getKiosks(stadium_id ): Observable<CKiosk[]> {
    const headers = CHelpers.setHeader();
    let data =  {"stadium_id":stadium_id };

      return this.http.get( host.url + '/kiosks/getkiosks',{headers, params:data}).pipe(map(data=>{
          let usersList = data["kiosks"];
          return usersList.map(function(data:any) {
              return {
                kiosk_id: data.kiosk_id,
                stand_id: data.stand_id,
                kiosk_name: data.kiosk_name,
                kiosk_enable:  data.kiosk_enable
              };
            });
          }),catchError(CHelpers.handleError));
  }

  createKiosk(stand_id, kiosk_name, stadium_id): Observable<CKiosk[]> {
    const headers = CHelpers.setHeader();
    let data =  { "stand_id"  : stand_id,
                  "kiosk_name": kiosk_name,
                  "stadium_id": stadium_id
    };
      return this.http.get( host.url + '/kiosks/createkiosk',{headers, params:data}).pipe(map(data=>{
          let usersList = data["kiosks"];
          return usersList.map(function(data:any) {
              return {
                kiosk_id: data.kiosk_id,
                stand_id: data.stand_id,
                kiosk_name: data.kiosk_name,
                kiosk_enable:  data.kiosk_enable
              };
            });
          }),catchError(CHelpers.handleError));
  }

  deleteKiosk(kiosk_data: any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/kiosks/deletekiosk',kiosk_data,{headers}).subscribe((resp: any) => {
      return resp.message;
    },catchError(CHelpers.handleError));
  }
}
