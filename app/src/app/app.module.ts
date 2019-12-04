import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { routes } from './app.routing';

import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { SearchFormModule } from './shared/components';
import { ProductService, Product } from './shared/services';
import { SHARED_SERVICES } from './shared/services';
import { API_BASE_URL, WS_URL } from './app.tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),

    SearchFormModule
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: WS_URL, useValue: environment.wsUrl }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
