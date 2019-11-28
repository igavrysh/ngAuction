import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatGridListModule } from '@angular/material';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail';
import { ProductSuggestionComponent } from './product-suggestion';

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
