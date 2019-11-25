import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../shared/services'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nga-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  readonly categoriesNames$: Observable<string[]>;
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.categoriesNames$ = this.productService.get
   }

  ngOnInit() {
  }

}
