import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductService, Product } from './shared/services';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material';
import { SearchFormModule } from './shared/components';
import { CategoriesComponent } from './home/categories/categories.component';
import { ProductGridComponent } from './home/product-grid/product-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductGridComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    SearchFormModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
