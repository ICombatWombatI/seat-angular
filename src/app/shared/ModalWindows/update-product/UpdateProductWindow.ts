import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../service/category/categories.service';
import { ProductService } from '../../../service/product/product.service';

import { CCategories } from '../../../shared/classes/categories';
@Component({
  selector: 'UpdateProductWindow',
  templateUrl: './UpdateProductWindow.html',
  styleUrls: ['./UpdateProductWindow.css']
})

export class UpdateProductWindow implements OnInit {

  constructor( public dialogRef: MatDialogRef<UpdateProductWindow>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private router: Router,
               public CategoriesService:CategoriesService,
               public ProductService:ProductService ) { }
    

  product_name: string = "";
  product_id: number = 0;
  product_price: number = 0;
  category_id: number = 0;
  category_name: string = "12";
  categories: CCategories[]=[];
  cat : CCategories ={ category_name: "name",category_id: 1 };

  ngAfterContentChecked() {
    if (this.categories.length) {
      for(let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].category_id == this.category_id) {
          this.category_name = this.categories[i].category_name;
          break;
        }
      }
    }
  }

  ngOnInit() {
    this.product_name = this.data.product_name;
    this.product_price = this.data.product_price;
    this.product_id = this.data.product_id;
    this.category_id = this.data.category_id;
    this.CategoriesService.getCategories().subscribe(data => this.categories = data);
  }

  updateProduct() {
    let product_data = new FormData();
    product_data.append('product_id', this.product_id.toString());
    product_data.append('category_id', this.category_id.toString());
    product_data.append('product_price', this.product_price.toString());
    product_data.append('product_name', this.product_name);
    this.ProductService.updateProduct(product_data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}