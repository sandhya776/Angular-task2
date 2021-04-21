import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ProductsComponent } from './components/products/products.component';
import { ViewDetailComponent } from './components/view-detail/view-detail.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ConfigureProductComponent } from './components/configure-product/configure-product.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guards/can-activate.guard';
import { NoAccessComponent } from './components/no-access/no-access.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuardService] },
  { path: 'no-access', component: NoAccessComponent},

  {
    path: 'products', component: ProductsComponent,
    children: [
      { path: '', component: ViewProductsComponent, canActivate: [AuthGuardService], data : {roles : [0]} },
      { path: 'view-products', component: ViewProductsComponent, canActivate: [AuthGuardService], data : {roles : [0]} },
      { path: 'view-products/:id', component: ViewDetailComponent, canActivate: [AuthGuardService], data : {roles : [0]} },
      { path: 'configure', component: ConfigureProductComponent, canActivate: [AuthGuardService], data : {roles : [2]} },
      { path: 'configure/:id', component: ConfigureProductComponent, canActivate: [AuthGuardService], data : {roles : [2]} },
      { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuardService], data : {roles : [0]} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
