import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { CHelpers } from '../../shared/helpers/helpers';
import { host } from '../../shared/config';

import { COrderData } from '../../shared/classes/orderData';
import { COrder } from '../../shared/classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersCount(stadium_id:any) {
    const headers = CHelpers.setHeader();
    let orders_data = {"stadium_id": stadium_id };

    return this.http.get( host.url + '/orders/getorderscount',{headers, params:orders_data}).pipe(map(data=>{
      return data;
    }),catchError(CHelpers.handleError));
  }

  getOrders(stadium_id:any, page:number): Observable<COrder[]> {
  const headers = CHelpers.setHeader();
  let orders_data = {"stadium_id": stadium_id, "page": page.toString() };

    return this.http.get( host.url + '/orders/getorders',{headers,params:orders_data}).pipe(map(data=>{
        let ordersList = data["orders"];

        let status = data["status"];
        if (!status)
          return null;

        return ordersList.map(function(data:any) {
            return {
              order_id: data.order_id,
              user_id: data.user_id,
              order_stadium_id: data.order_stadium_id,
              order_stand_id: data.order_stand_id,
              order_kiosk_id: data.order_kiosk_id,
              order_date_created: data.order_date_created,
              order_status: data.order_status
            };
          });
        }),catchError(CHelpers.handleError));
  }

  getOrderById(order_id): Observable<COrderData[]> {
    const headers = CHelpers.setHeader();
    let params = new HttpParams().set("order_id", order_id);

    return this.http.get( host.url + '/orders/getorderbyid',{headers,params:params}).pipe(map(data=>{
        let ordersList = data["order"];
        return ordersList.map(function(data:any) {
            return {
                 client_name           : data.client_name,
                 client_phone          : data.client_phone,
                 delivery              : data.delivery ,
                 order_delivery_section: data.order_delivery_section ,
                 order_delivery_row    : data.order_delivery_row ,
                 order_delivery_seat   : data.order_delivery_seat ,
                 created               : data.created,
                 order_readiness_time  : data.order_readiness_time,
                 order_status          : data.order_status ,
                 total_price           : data.total_price ,
            };
          });
        }),catchError(CHelpers.handleError));
  }
}
