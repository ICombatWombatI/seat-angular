import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';

import { ConfirmWindow } from '../../shared/ModalWindows/confirm-window/ConfirmWindow';

import { CProduct } from '../../shared/classes/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( public dialog: MatDialog, 
               private http: HttpClient ) { }
  
  eraseProdList(product_data : any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/products/eraseprodlist',  product_data, {headers}).subscribe((resp: any) => {

      let dialogRef = this.dialog.open(ConfirmWindow, {
        width: '350px',
        data: { message: resp.message }
      });
  
      return resp.message;
    },catchError(CHelpers.handleError));
  }

  uploadProdList(upload_list: any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/products/uploadprodlist', upload_list, {headers}).subscribe((resp: any) => {

      let dialogRef = this.dialog.open(ConfirmWindow, {
        width: '350px',
        data: { message: resp.message }
      });

      return resp.message;
    },catchError(CHelpers.handleError));
  }

  getProductsById(kiosk_id): Observable<CProduct[]>  {
    const headers = CHelpers.setHeader();
    let params = new HttpParams().set("kiosk_id", kiosk_id);

    return this.http.get( host.url + '/products/getproductsbyid',{headers,params:params}).pipe(map(data=>{
        let products = data["products"];

        let status = data["status"];
        if(!status)
          return null;

        return products;
        }),catchError(CHelpers.handleError));
  }

  getAllProducts (): Observable<CProduct[]> {
    const headers = CHelpers.setHeader();

    return this.http.get( host.url + '/products/getallproducts',{headers}).pipe(map(data=>{
        let usersList = data["products"];
        return usersList.map(function(data:any) {
            return {
              product_id: data.product_id,
              product_name: data.product_name,
              product_price: data.product_price,
              category_id: data.category_id,
              product_featured_url: data.product_featured_url,
              product_description: data.product_description
            };
          });
        }),catchError(CHelpers.handleError));
  }

  getProducts(page): Observable<CProduct[]> {
    const headers = CHelpers.setHeader();
    let params = new HttpParams().set("page", page);

    return this.http.get( host.url + '/products/getproducts',{headers,params:params}).pipe(map(data=>{
        let usersList = data["products"];
        return usersList.map(function(data:any) {
            return {
              product_id: data.product_id,
              product_name: data.product_name,
              product_price: data.product_price,
              category_id: data.category_id,
              product_featured_url: data.product_featured_url,
              product_description: data.product_description
            };
          });
        }),catchError(CHelpers.handleError));
  }

  updateProduct (product_data: any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/products/updateproduct', product_data, {headers}).subscribe((resp: any) => {
      return resp.message;
    },catchError(CHelpers.handleError));
  }

  getProductsCount() {
    const headers = CHelpers.setHeader();

    return this.http.get( host.url + '/products/getproductscount',{headers}).pipe(map(data=>{
      return data;
    }),catchError(CHelpers.handleError));
  }

  createProduct(product_data: any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/products/createproduct', product_data, {headers}).subscribe((resp: any) => {
      return resp.message;
    },catchError(CHelpers.handleError));
  }

  deleteProduct(product_data: any) {
    const headers = CHelpers.setHeader();

    this.http.post(host.url + '/products/deleteproduct' , product_data, {headers}).subscribe((resp: any) => {
      return resp.message;
    },catchError(CHelpers.handleError));
  }
}
