import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens'

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ProductSearchParams {
  [key: string]: any; // To make compatible with HttpParams type
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products/all.json');
  }

  getBuyId(productId: string): Observable<Product> {
    return this.http.get<Product[]>('/data/products/all.json')
      .pipe(
        map(products => <Product>products.find(p => p.id === productId))
      );
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`, {params});
  }
}
