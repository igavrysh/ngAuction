import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/shared/services';

@Component({
  selector: 'nga-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product = <Product>{};

  constructor() { }

  ngOnInit() {
    console.log("product detail " + this.product.id + " product name " + this.product.title);
  }

}
