import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { COrderData } from '../../../shared/classes/orderData';
import { OrdersService } from '../../../service/order/orders.service';

@Component({
  selector: 'OrderWindow',
  templateUrl: './OrderWindow.html',
  styleUrls: ['./OrderWindow.css']
})

export class OrderWindow implements OnInit {

  constructor( public dialogRef: MatDialogRef<OrderWindow>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private router: Router,
               private OrdersService: OrdersService ) { }

  order:COrderData[]=[];

  ngOnInit() {
    this.OrdersService.getOrderById(this.data.order_id).subscribe(data => this.order = data);
  }

  addProduct() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}