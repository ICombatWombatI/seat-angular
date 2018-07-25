import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { CCategories } from '../../shared/classes/categories';
import { CProduct } from '../../shared/classes/product';

import { UpdateProductWindow } from '../../shared/ModalWindows/update-product/UpdateProductWindow';
import { ModalWindow } from '../../shared/ModalWindows/modal-window/ModalWindow';

import { CategoriesService } from '../../service/category/categories.service';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product-controller',
  templateUrl: './product-controller.component.html',
  styleUrls: ['./product-controller.component.css']
})
export class ProductControllerComponent implements OnInit {

  categories: CCategories[] = [];
  products: CProduct[] = [];
  product_name: string;
  priviuse: boolean = false;
  next: boolean = false;
  pageIndex: number = 1;
  product_count: number = 0;
  data: number = 0;
  numb: any;

  constructor(public dialog: MatDialog,
    private router: Router,
    private CategoriesService: CategoriesService,
    private ProductService: ProductService) { }

  ngAfterContentChecked() {

    this.PageLogic();

    if (this.products.length) {
      this.data = 1;
    }
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.ProductService.getProductsCount().subscribe(data => this.numb = data);
  }

  getCategories() {
    this.CategoriesService.getCategories().subscribe(data => this.categories = data);
  }

  getProducts() {
    this.ProductService.getProducts(this.pageIndex).subscribe(data => this.products = data);
  }

  newPage(page_index: number) {
    if (page_index <= 0) {
      this.priviuse = false;
      return false;
    }
    this.data = 4;
    this.priviuse = false;
    this.next = false;
    this.products.splice(0, this.products.length);
    return true;
  }

  priviosPage() {
    if (this.newPage(this.pageIndex - 1)) {
      this.pageIndex = this.pageIndex - 1;
      this.data = 0;
      this.products.splice(0, this.products.length);
      this.ProductService.getProducts(this.pageIndex).subscribe(data => this.products = data);
      this.ProductService.getProductsCount().subscribe(data => this.numb = data);
    }
  }

  nextPage() {
    this.pageIndex = this.pageIndex + 1;
    this.data = 0;
    this.products.splice(0, this.products.length);
    this.ProductService.getProducts(this.pageIndex).subscribe(data => this.products = data);
    this.ProductService.getProductsCount().subscribe(data => this.numb = data);
  }

  owerView(product_id, product_name, product_price, category_id) {
    let dialogRef = this.dialog.open(UpdateProductWindow, {
      width: '700px',
      data: {
        product_id: product_id,
        product_name: product_name,
        product_price: product_price,
        category_id: category_id,
        categories: this.categories
      }
    });

  }

  deleteProduct(index, product_id) {
    /* "Are you shure?" dialog */
    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: "Are you shure?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let product_data: FormData;
        product_data = new FormData();

        product_data.append('product_id', product_id);

        this.ProductService.deleteProduct(product_data);
        this.products.splice(index, 1);
      }
    });
  }

  PageLogic() {
    if (this.pageIndex > 1) {
      this.priviuse = true;
    } else {
      this.priviuse = false;
    }

    if (this.product_count > (this.pageIndex) * 10) {
      this.next = true;
    } else {
      this.next = false;
    }

    if (this.numb && this.product_count == 0) {

      this.product_count = this.numb.product_count[0].product_count;
      if (this.product_count > 10) {
        this.next = true;
      }
      else {
        this.next = false;
      }
    }
  }

}
