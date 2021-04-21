import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public links = [
    { label: 'View All Products', path: 'view-products', show: true },
    { label: 'Add New Product', path: 'configure', show: this.authService.user && this.authService.user.roleId == 2 ? true : false },
    { label: 'Tshirts', path: 'category/1', show: true },
    { label: 'Shirts', path: 'category/2', show: true },
    { label: 'Coat Pant', path: 'category/3', show: true },
    { label: 'Suit Salwar', path: 'category/4', show: true },
    { label: 'Shoes', path: 'category/5', show: true }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
}
