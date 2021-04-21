import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/service/ProductService';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let productService: ProductService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CategoryComponent],
      providers: [ProductService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    inject([ProductService], (prodSer: ProductService) => {
      productService = prodSer;
    });
    component = fixture.componentInstance;
    // component = new CategoryComponent(productService, router, activatedRoute);
    component.productsData = [
      {
        id: 2,
        productName: 'task1',
        categoryId: 3,
        description: 'test',
        rating: 2,
        productColor: 'red',
        isAvailable: true,
        productPrice: 100,
        reviews: 10,
        image: 'abcd'
      },
      {
        id: 3,
        productName: 'task1',
        categoryId: 3,
        description: 'test',
        rating: 2,
        productColor: 'red',
        isAvailable: true,
        productPrice: 100,
        reviews: 10,
        image: 'abcd'
      }
    ];
  });

  it('delete product', () => {
    component.deleteProduct(2);
    component.productsData = component.productsData.filter(x => x.id !== 2);
    const data = jasmine.createSpy('deleteProduct').and.returnValue(of(component.productsData));
    console.log(data)
    expect(component.productsData).toEqual(
      [{
        id: 3,
        productName: 'task1',
        categoryId: 3,
        description: 'test',
        rating: 2,
        productColor: 'red',
        isAvailable: true,
        productPrice: 100,
        reviews: 10,
        image: 'abcd'
      }]
    );
  });

  it('get all product', () => {
    fixture.detectChanges();
    const result = component.productsData;
    jasmine.createSpy('getAllProducts').and.returnValue(of(result));
    expect(result).toEqual(component.productsData);
  });
});
