import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/service/ProductService';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-configure-product',
  templateUrl: './configure-product.component.html',
  styleUrls: ['./configure-product.component.scss']
})
export class ConfigureProductComponent implements OnInit {
  productForm = this.formBuilder.group({
    id: [0],
    productName: ['', Validators.required],
    categoryId: [0, Validators.required],
    description: ['', Validators.required],
    rating: [0, Validators.required],
    productColor: ['', Validators.required],
    isAvailable: [false, Validators.required],
    productPrice: [0, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
    reviews: [0, Validators.required],
    image: ['', Validators.required]
  });
  productsData: Products[] = [];
  type = 'Add';
  constructor(private formBuilder: FormBuilder, private acr: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.productsData = res.sort((a, b) => a.id - b.id);
      if (this.acr.snapshot.params.id) {
        const data = this.productsData.find(x => x.id === parseInt(this.acr.snapshot.params.id));
        if (data) {
          this.productForm.setValue(data);
          this.type = 'Update';
        } else {
          alert('Product not found');
          this.router.navigate([`products/view-products`]);
        }
      }
    });
  }
  onSubmit() {
    this.productsData = this.productsData.sort((a, b) => a.id - b.id);
    const highestId = this.productsData[this.productsData.length - 1].id;
    const data = this.productForm.value;
    data.categoryId = parseInt(data.categoryId);
    data.rating = parseInt(data.rating);
    data.reviews = parseInt(data.reviews);
    data.productPrice = parseInt(data.productPrice);
    if (this.type === 'Add') {
      data.id = highestId + 1;
      this.productService.addProduct(data).subscribe(res => {
        this.getAllProducts();
        alert('form is submitted');
      });
    } else {
      this.productService.updateProduct(data).subscribe(res => {
        this.getAllProducts();
        this.type = 'Add';
      });
    }
    this.productForm.reset();
    this.router.navigate([`products/view-products`]);
  }

  onChoose(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (res) => {
      this.productForm.controls.image.setValue(reader.result);
    };
  }
}
