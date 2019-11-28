import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens'

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
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

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.filter(p => p.categories.includes(category)))
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(this.reduceCategories),
      map(categories => Array.from(new Set(categories)))
    );
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => this.filterProducts(products, params))
    );
  }

  private reduceCategories(prouducts: Product[]): string[] {
    return prouducts.reduce((all, product) => all.concat(product.categories), new Array<string>());
  }

  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products.filter(p => {
      if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }

      if (params.minPrice && p.price < params.minPrice) {
        return false;
      }

      if (params.maxPrice && p.price > params.maxPrice) {
        return false;
      }

      return true;
    });
  }
}
