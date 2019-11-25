import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../shared/services'
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nga-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  readonly categories$: Observable<string[]>;
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.productService.getAllCategories().pipe(
      map(categories => ['all', ...categories]));
    
    this.products$ = this.route.params.pipe(
      switchMap(({ category }) => this.getCategory(category)));
  }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all'
      ? this.productService.getAll()
      : this.productService.getByCategory(category.toLowerCase());
  }
}
