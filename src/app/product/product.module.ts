import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductComponent
      }
    ]),
    MatButtonModule,
    MatGridListModule
  ],
  declarations: [
    ProductComponent, 
    ProductDetailComponent, 
    ProductSuggestionComponent
  ]
})
export class ProductModule { }
