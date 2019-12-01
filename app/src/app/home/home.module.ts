import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductGridComponent } from './product-grid/product-grid.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'search', component: SearchComponent },
  { path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: CategoriesComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule
  ],
  declarations: [
    SearchComponent,
    CategoriesComponent,
    ProductGridComponent
  ]
})
export class HomeModule { }
