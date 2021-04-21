import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ProductsComponent } from './components/products/products.component';
import { ViewDetailComponent } from './components/view-detail/view-detail.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ConfigureProductComponent } from './components/configure-product/configure-product.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guards/can-activate.guard';
import { NoAccessComponent } from './components/no-access/no-access.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};
@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    ProductsComponent,
    ViewDetailComponent,
    ViewProductsComponent,
    ConfigureProductComponent,
    CategoryComponent,
    LoginComponent,
    NoAccessComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    MatDialogModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
  },
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
