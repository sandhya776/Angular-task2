import { TestBed, inject } from '@angular/core/testing';
import { ProductService } from './ProductService';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Products } from '../models/products';

describe('TestService', () => {
    let httpTestingController: HttpTestingController;
    let service: ProductService;
    let product: Products;
    let productArray: Products[];

    let productService: ProductService;
    const baseUrl = 'http://localhost:3000/data';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.inject(ProductService);
        product = {
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
        }
        productArray = [
            {
                id: 1,
                productName: 'task1',
                categoryId: 3,
                description: 'test',
                rating: 2,
                productColor: 'red',
                isAvailable: true,
                productPrice: 100,
                reviews: 10,
                image: 'abcd'
            }, {
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
            }]
    });

    beforeEach(inject(
        [ProductService],
        (service: ProductService) => {
            productService = service;
        }
    ));

    it('get product', () => {
        let products: Products[];
        service.getAllProducts().subscribe(res => {
            products = res;
        });
        const req = httpTestingController.expectOne({
            method: 'GET',
            url: baseUrl
        });
        req.flush([product]);
        expect(products[0]).toEqual(product);
    });

    it('save product', () => {
        let products: Products[];
        service.addProduct(product).subscribe(res => {
            products = res;
        });
        const req = httpTestingController.expectOne({
            method: 'POST',
            url: baseUrl
        });
        req.flush([product]);
        expect(products[0]).toEqual(product);
    });

    it('update product', () => {
        let products: Products[];
        product.description = 'testdesc';
        service.updateProduct(product).subscribe(res => {
            products = res;
        });
        const req = httpTestingController.expectOne({
            method: 'PUT',
            url: baseUrl + '/' + product.id
        });
        req.flush([product]);
        expect(products[0].description).toEqual(product.description);
    });

    it('delete product', () => {
        let products: Products[];
        service.deleteProduct(product.id).subscribe(res => {
            products = res;
        });
        const req = httpTestingController.expectOne({
            method: 'DELETE',
            url: baseUrl + '/' + product.id
        });
        productArray = productArray.filter(x => x.id !== product.id)
        req.flush([productArray]);
        expect(productArray).toEqual([
            {
                id: 1,
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
        ])
    });
});
