import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Product, ProductService } from '../shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nga-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { 

    console.log("product component");
    
    this.product$ = this.route.paramMap.pipe(
      map(params => {
        console.log("Getting product with id " + params.get('productId') || '');

        return params.get('productId') || ''
      }),
      filter(productId => !!productId),
      switchMap(productId => this.productService.getBuyId(productId))
    );

    this.suggestedProducts$ = this.productService.getAll();
  }
}
