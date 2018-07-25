// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BaseRequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes,
  CanActivate
} from '@angular/router';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

// Components
//-------------------------Main------------------------------//
import { AppComponent } from './app.component';
//-------------------------Toolbar---------------------------//
import { ToolbarComponent } from './toolbar/toolbar.component';
//-----------------------Autorization------------------------//
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
//-------------------------Stadiums--------------------------//
import { CreateStadiumComponent } from './stadiums/create-stadium/create-stadium.component';
import { StadiumListComponent } from './stadiums/stadium-list/studium-list.component';
//-----------------------NewsComponent-----------------------//
import { NewsComponent } from './news/news.component';
//------------------------ModalWindow------------------------//
import { ModalWindow } from './shared/ModalWindows/modal-window/ModalWindow';
import { ModalLoginWindow } from './shared/ModalWindows/login/ModalLoginWindow';
import { UpdateProductWindow } from './shared/ModalWindows/update-product/UpdateProductWindow';
import { KioskControllerWindow } from './shared/ModalWindows/kiosk-controller/KioskControllerWindow';
import { StadiumWindow } from './shared/ModalWindows/stadium-window/StadiumWindow';
import { OrderWindow } from './shared/ModalWindows/orders-window/OrderWindow';
import { KioskProduct } from './shared/ModalWindows/kiosk-product/KioskProduct';
import { ConfirmWindow } from './shared/ModalWindows/confirm-window/ConfirmWindow';
import { AddNewsWindow } from './shared/ModalWindows/add-news/AddNewsWindow';
import { UpdateNewsWindow } from './shared/ModalWindows/update-news/UpdateNewsWindow';
//---------------------------Food----------------------------//
import { ProductComponent } from './product/product.component';
import { ProductCreationComponent } from './product/product-creation/product-creation.component';
import { ProductControllerComponent } from './product/product-controller/product-controller.component';
//-----------------------Orders------------------------------//
import { OrdersComponent } from './orders/orders.component';

// Services StadiumService
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthService } from './service/auth/auth.service';
import { StadiumService } from './service/stadium/stadium.service';
import { StandsService } from './service/stands/stands.service';

import { KiosksService } from './service/kiosk/kiosks.service';
import { CategoriesService } from './service/category/categories.service';
import { OrdersService } from './service/order/orders.service';
// Ui components
import {
  MatDialogModule,
  MatDividerModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatProgressBarModule,
} from '@angular/material';

const appRoutes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'stadiums', component: StadiumListComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'over-view', component: CreateStadiumComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'auth', pathMatch: 'prefix' }
];

export class DemoMaterialModule {}

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StadiumListComponent,
    LoginFormComponent,
    ToolbarComponent,
    ModalWindow,
    ModalLoginWindow,
    UpdateProductWindow, 
    StadiumWindow,
    KioskControllerWindow,
    OrderWindow,
    KioskProduct,
    ConfirmWindow,
    AddNewsWindow,
    UpdateNewsWindow,
    ProductComponent,
    CreateStadiumComponent,
    ProductControllerComponent,
    ProductCreationComponent,
    OrdersComponent,
    NewsComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [ 
    ModalWindow, 
    ModalLoginWindow, 
    LoginFormComponent,
    UpdateProductWindow, 
    StadiumWindow,
    OrderWindow,
    KioskProduct,
    ConfirmWindow,
    AddNewsWindow,
    UpdateNewsWindow,
    KioskControllerWindow
  ],
  providers: [
    AuthGuard,
    StadiumService,
    StandsService,
    AuthService,
    KiosksService,
    CategoriesService,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }