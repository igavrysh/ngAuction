import { ChangeDetectionStrategy, Component, OnInit, Input, Inject } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout'; 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { first } from 'rxjs/operators'; 
import { Product } from '../../shared/services';
import { API_BASE_URL } from 'src/app/app.tokens';

@Component({
  selector: 'nga-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent {
  @Input() products: Product[];

  readonly columns$: Observable<number>;

  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5]
  ]);

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly media: MediaObserver
  ) { 
    this.columns$ = this.media.asObservable()
      .pipe(map(arr => arr.map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias))))
      .pipe(map(arr => arr.shift()));
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}