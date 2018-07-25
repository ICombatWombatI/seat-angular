import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';

import { CVendors } from '../../shared/classes/vendor';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient, private router: Router) { }

  deleteVendor(vendor_data: any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/vendors/deletevendor', vendor_data, {headers}).subscribe((resp: any) => {
      return resp.message;
    },catchError(CHelpers.handleError));
  }

  createVendor(vendor_data: any): Observable<CVendors[]>  {
    const headers = CHelpers.setHeader();

    return this.http.get(host.url + '/vendors/createvendor', { headers, params: vendor_data }).pipe(map(data => {
      let vendor = data["vendor"];
  
      return vendor.map(function (data: any) {
        return {
          vendor_id: data.vendor_id,
          vendor_name: data.vendor_name,
          vendor_email: data.vendor_email,
        };
      });
    }), catchError(CHelpers.handleError));
  }

  getVendor(stadium_id: any): Observable<CVendors[]> {
    const headers = CHelpers.setHeader();
    let data = { "stadium_id": stadium_id };

    return this.http.get(host.url + '/vendors/getvendor', { headers, params: data }).pipe(map(data => {
      let vendor = data["vendor"];

      let status = data["status"];
      if (!status)
        return null;

      return vendor.map(function (data: any) {
        return {
          vendor_id: data.vendor_id,
          vendor_name: data.vendor_name,
          vendor_email: data.vendor_email,
        };
      });
    }), catchError(CHelpers.handleError));
  }

}
