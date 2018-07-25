import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/product/product.service';
import { CProduct } from '../../../shared/classes/product';

@Component({
  selector: 'KioskProduct',
  templateUrl: './KioskProduct.html',
  styleUrls: ['./KioskProduct.css']
})

export class KioskProduct implements OnInit {

  constructor( public dialogRef: MatDialogRef<KioskProduct>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private router: Router,
               private ProductService: ProductService ) { }

  products: CProduct[]= [];
  selecteProducts: FormControl;
  aaas: any;
  productSelected: boolean = false;
  data_is_came: number = 1;
  kiosk_name: string = "";
  product_id_mass: CProduct[]=[];
  mass : number []=[];
  deletedProd: number []=[];
  addProd: number []=[];
  // CProduct[]= [];

  ngAfterContentChecked() {
    if(this.product_id_mass == null && this.data_is_came==1) {
      this.product_id_mass = [];
      this.data_is_came = 2;
      this.selecteProducts.setValue(this.mass);
    } else if (this.product_id_mass.length && this.data_is_came==1) {

    for(let i=0; i<this.product_id_mass.length; i++) {
      this.mass[i] = this.product_id_mass[i].product_id; 
    }
    this.selecteProducts.setValue(this.mass);
    this.data_is_came = 2;
    }
  }

  ngOnInit() {
    this.getAllProducts();
    this.getProductsById();
    this.selecteProducts = new FormControl();

    this.kiosk_name = this.data.kiosk_name;
  }
 //deletedProd: number []=[];
     // addProd: number []=[];
  updateProdList() {
    this.uploadProdList();
    this.eraseProdList();
  }

  eraseProdList() {
    let i = 0;
    this.deletedProd.splice(0, this.deletedProd.length);
    while (this.product_id_mass.length > i) {
      let j = 0;
      let oldElement = false;
      while (this.selecteProducts.value.length > j) {
        if ( this.product_id_mass[i].product_id == this.selecteProducts.value[j] ) {
          oldElement = true;
          break;
        }
        j++;
      };
      if(!oldElement) {
        this.deletedProd.push(this.product_id_mass[i].product_id);
      }
      i++;
    };

    if (this.deletedProd.length) {
      let product_data = new FormData();
      this.deletedProd.forEach(product_id => {
        product_data.append('product_id', product_id.toString());
      });
      product_data.append('kiosk_id', this.data.kiosk_id.toString());
      this.ProductService.eraseProdList(product_data);
    }
  }

  uploadProdList() {
    let i = 0;
    this.addProd.splice(0, this.addProd.length);
    while (this.selecteProducts.value.length > i) {
      let j = 0;
      let oldElement = false;
      while (this.product_id_mass.length > j) {
        if (this.selecteProducts.value[i] == this.product_id_mass[j].product_id) {
          oldElement = true;
          break;
        }
        j++;
      };
      j = 0;
      if(!oldElement) {
        this.addProd.push(this.selecteProducts.value[i]);
      }
      i++;
    };

    if(this.addProd.length) {
      let product_data = new FormData();
      this.addProd.forEach(product_id => {
        product_data.append('product_id', product_id.toString());
      });
      product_data.append('kiosk_id', this.data.kiosk_id.toString());
      this.ProductService.uploadProdList(product_data);
    }
  }

  addProduct() {

  }
  
  getAllProducts() {
    this.ProductService.getAllProducts().subscribe(data => this.products = data);
   
  }

  getProductsById() {
    this.ProductService.getProductsById(this.data.kiosk_id).subscribe(data => this.product_id_mass = data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}