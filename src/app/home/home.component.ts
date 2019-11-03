import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators'; 
import { Product, ProductService } from '../shared/services';
import { MediaObserver } from '@angular/flex-layout';


@Component({
  selector: 'nga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly columns$: Observable<number>;

  readonly products$: Observable<Product[]>;

  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5]
  ]);

  constructor(
    private media: MediaObserver, 
    private productService: ProductService) { 
    this.products$ = this.productService.getAll();
    
    this.columns$ = this.media.asObservable()
      .pipe(map(arr => arr.map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias))))
      .pipe(map(arr => arr.shift()));
  }

  ngOnInit() {
  }

}
