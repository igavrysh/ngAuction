import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material';
import { SearchResultsComponent } from './search/search-results/search-results.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchResultsComponent
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
