import { Component, OnInit, Inject } from '@angular/core';
import { OrderWindow } from '../shared/ModalWindows/orders-window/OrderWindow';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrdersService } from '../service/order/orders.service';
import { COrder } from '../shared/classes/order';

import { CStadium } from '../shared/classes/stadium';
import { StadiumService } from '../service/stadium/stadium.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private OrdersService: OrdersService,
    private StadiumService: StadiumService,
  ) { }

  ngAfterContentChecked() {
    if (this.pageIndex > 1) {
      this.priviuse = true;
    } else {
      this.priviuse = false;
    }

    if (this.count_orders > (this.pageIndex - 1) * 10) {
      this.next = true;
    } else {
      this.next = false;
    }

    if (this.numb && this.count_orders == 0) {

      this.count_orders = this.numb.orders_count[0].orders_count;
      if (this.count_orders > 10) {
        this.next = true;
      }
      else {
        this.next = false;
      }
    }

    if (this.orders === null) {
      this.data_is_came = 3;
      this.orders = [];
    } else if (this.orders.length) {
      this.data_is_came = 1;
    }
  }

  orders: COrder[] = [];
  data_is_came: number = 4;
  stadium_id: number = 0;
  numb: any;
  priviuse: boolean = false;
  next: boolean = false;
  count_orders: number = 0;
  pageIndex: number = 1;

  priviosPage() {
    if (this.newPage(this.pageIndex - 1)) {
      this.pageIndex = this.pageIndex - 1;
      this.data_is_came = 0;
      this.orders.splice(0, this.orders.length);
      this.OrdersService.getOrdersCount(this.stadium_id).subscribe(data => this.numb = data);
      this.OrdersService.getOrders(this.stadium_id, this.pageIndex).subscribe(data => this.orders = data);
    }
  }

  nextPage() {
    if (this.newPage(this.pageIndex + 1)) {
      this.pageIndex = this.pageIndex + 1;
      this.data_is_came = 0;
      this.orders.splice(0, this.orders.length);
      this.OrdersService.getOrdersCount(this.stadium_id).subscribe(data => this.numb = data);
      this.OrdersService.getOrders(this.stadium_id, this.pageIndex).subscribe(data => this.orders = data);
    }
  }

  stadiums: CStadium[] = [];

  stands = [
    {
      title: "I",
    },
    {
      title: "II",
    },
    {
      title: "III",
    },
  ];

  kiosks = [
    {
      title: "Subway",
    },
    {
      title: "Shrek",
    },
    {
      title: "Chum bucket",
    },
  ];

  ngOnInit() {
    this.getStadiums();
  }

  getStadiums() {
    this.StadiumService.getStadiums(2).subscribe(data => this.stadiums = data);
  }

  clearFilter() {
    this.data_is_came = 4;
    this.priviuse = false;
    this.next = false;
    this.count_orders = 0;
    this.pageIndex = 1;
    this.orders.splice(0, this.orders.length);
  }

  newPage(page_index) {
    if (page_index <= 0) {
      this.priviuse = false;
      return false;
    }
    this.data_is_came = 4;
    this.priviuse = false;
    this.next = false;
    this.count_orders = 0;
    this.orders.splice(0, this.orders.length);
    return true;
  }

  getOrders(stadium_id) {
    this.clearFilter()
    this.stadium_id = stadium_id;
    this.data_is_came = 0;
    this.orders.splice(0, this.orders.length);
    this.OrdersService.getOrdersCount(this.stadium_id).subscribe(data => this.numb = data);
    this.OrdersService.getOrders(this.stadium_id, this.pageIndex).subscribe(data => this.orders = data);
  }

  showDetails(order_id) {
    let dialogRef = this.dialog.open(OrderWindow, {
      width: '400px',
      data: { order_id: order_id }
    });
  }

}
