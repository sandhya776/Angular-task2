import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Products } from '../models/products';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    url = 'http://localhost:3000/data';
    httpOptions = {
        headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    constructor(private htc: HttpClient) { }

    getAllProducts(): Observable<Products[]> {
        return this.htc.get<Products[]>(this.url);
    }

    addProduct(data): Observable<Products[]> {
        return this.htc.post<Products[]>(this.url, data, this.httpOptions);
    }

    updateProduct(data): Observable<Products[]> {
        return this.htc.put<Products[]>(this.url + '/' + data.id, data, this.httpOptions);
    }

    deleteProduct(id): Observable<Products[]> {
        return this.htc.delete<Products[]>(this.url + '/' + id, { responseType: 'json' });
    }
}
