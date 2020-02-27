import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MdcCardModule, MdcTextFieldModule, MdcButtonModule, MdcTopAppBarModule, MdcIconModule, MdcIconButtonModule,
  MdcDrawerModule, MdcListModule, MdcRippleModule
} from '@angular-mdc/web';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TopbarComponent } from './topbar/topbar.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NewsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    TopbarComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdcTopAppBarModule,
    MdcRippleModule,
    MdcListModule,
    MdcDrawerModule,
    MdcIconModule,
    MdcIconButtonModule,
    MdcCardModule,
    MdcTextFieldModule,
    MdcButtonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
