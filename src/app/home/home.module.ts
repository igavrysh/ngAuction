import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductGridComponent } from './product-grid/product-grid.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchResultsComponent,
    CategoriesComponent,
    ProductGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', 
        component: HomeComponent
      }
    ]),
    FlexLayoutModule,
    MatGridListModule
  ]
})
export class HomeModule { }
