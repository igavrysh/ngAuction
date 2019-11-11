import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, ProductSuggestionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class ProductModule { }
