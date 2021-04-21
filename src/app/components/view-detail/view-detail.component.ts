import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/ProductService';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
  productsData: Products[] = [];
  deletedId = 0;
  constructor(private productService: ProductService, private router: Router, private acr: ActivatedRoute,public authService:AuthService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.productsData = res.sort((a, b) => a.id - b.id).filter(x => x.id === parseInt(this.acr.snapshot.params.id));
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
}
