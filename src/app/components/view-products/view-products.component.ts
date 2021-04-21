import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/ProductService';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  productsData: Products[] = [];
  filteredProductsData: any[] = [];
  deletedId = 0;
  constructor(private productService: ProductService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.productsData = res.sort((a, b) => a.id - b.id);
    });
  }
  deleteProduct(id) {
    // this.productsData = this.productsData.filter(x => x.id !== id);
    // this.filteredProductsData = this.filteredProductsData.filter(x => x.id !== id);
    this.deletedId = id;
    this.productService.deleteProduct(id).subscribe(res => {
      this.getAllProducts();
    });
  }
  updateProduct(product) {
    this.router.navigate([`products/configure/${product.id}`]);
  }
  viewCard(id) {
    this.router.navigate([`products/view-products/${id}`]);
  }
}
