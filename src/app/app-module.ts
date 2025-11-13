import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MainLayoutModule } from './main/main-layout/main-layout-module';
import { RouterModule } from '@angular/router';
import { Common } from './services/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModel } from './common/confirmation-model/confirmation-model';
import { MatDialogModule } from '@angular/material/dialog';
import { Login } from './pages/login/login';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { productState } from './store/reducers/product.reducer';
import { productReducer } from './store/reducers/product.reducer';
import { categoryState } from './store/reducers/category.reducer';
import { categoryReducer } from './store/reducers/category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/product.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoryEffects } from './store/effects/category.effect';

export interface AppState {
  products: productState;
  category: categoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productReducer,
  category: categoryReducer
};


@NgModule({
  declarations: [
    App,
    ConfirmationModel,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-multiple'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })  ,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductsEffects,CategoryEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgxIntlTelInputModule
  ],
  providers: [
    Common,
    AuthService,
    AuthGuard,
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
