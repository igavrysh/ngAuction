import { 
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Inject,
  OnChanges,
  SimpleChange
} from '@angular/core';
import {
  Product,
  BidMessage,
  BidService 
} from '../../shared/services';
import { Subject, Observable, combineLatest } from 'rxjs';
import { API_BASE_URL } from '../../app.tokens';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'nga-product-detail',
  styleUrls: ['./product-detail.component.scss'],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  private readonly productChange$ = new Subject<Product>();
  price$: Observable<number>;
  @Input() product: Product = <Product>{};

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly bidService: BidService
  ) {
    console.log("ProductDetail constructor");
  }

  ngOnInit() {
    this.price$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.bidService.priceUpdates.pipe(startWith<BidMessage | null>(null)),
      (product, bid) => bid && bid.productId === product.id ? bid.price : product.price
    );
  }

  ngOnChanges({ product } : { product: SimpleChange }) {
    this.productChange$.next(product.currentValue);
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
    console.log(
      'Placing bid: '
      + this.product.id
      + ', price: ' 
      + price
    );
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
