import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { ModalWindow } from '../../shared/ModalWindows/modal-window/ModalWindow';

import { CategoriesService } from '../../service/category/categories.service';
import { ProductService } from '../../service/product/product.service';

import { CCategories } from '../../shared/classes/categories';
import { CProduct } from '../../shared/classes/product';

export interface category {
  category_id: string;
  category_name: string;
}

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private router: Router,
    private CategoriesService: CategoriesService,
    private ProductService: ProductService
  ) { }

  categories: CCategories[] = [];

  category_name: string = "";
  product_name: string = "";

  product_price: number = null;
  category_id: number = null;
  Some: number = null;

  ngOnInit() {
    this.getCategories();
  }


  createProduct() {
    let product_data: FormData;
    product_data = new FormData();

    product_data.append('product_name', this.product_name);
    product_data.append('category_id', this.category_id.toString());
    product_data.append('product_price', this.product_price.toString());

    this.ProductService.createProduct(product_data);

    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: this.product_name + "  is created!" }
    });
    this.product_price = null;
    this.product_name = "";
    this.category_id = null;
  }

  getCategories() {
    this.CategoriesService.getCategories().subscribe(data => this.categories = data);
  }

  createCategory() {
    this.categories.splice(0, this.categories.length);
    this.CategoriesService.createCategory(this.category_name).subscribe(data => this.categories = data);

    this.category_name = "";

    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: "Product type was created" }
    });
  }

}
