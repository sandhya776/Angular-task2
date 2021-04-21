import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ProductService } from 'src/app/service/ProductService';
import { Products } from 'src/app/models/products';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productsData: Products[] = [];
  deletedId = 0;

  constructor(private productService: ProductService, private router: Router,public authService:AuthService, private acr: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getAllProducts();
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.productsData = res.sort((a, b) => a.id - b.id).filter(x => x.categoryId === parseInt(this.acr.snapshot.params.id));
    });
  }
  deleteProduct(id) {
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
