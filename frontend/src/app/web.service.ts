import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {baseUrl} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  cart: any[] = []
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  url = baseUrl
  productsCache = []

  constructor(private http: HttpClient,
              private userService: UserService) { }

  addToCart(product) {
    const index = this.cart.indexOf(product)
    if(index >= 0) {
      return
    }

    this.cart.push(product);
  }

  removeFromCart(product) {
    const index = this.cart.indexOf(product)
    if(index >= 0) {
      this.cart.splice(index, 1)
    }
  }

  getNews(): Observable<any> {
    return this.http.get(`${this.url}/news`, {headers: {Authorization: 'Bearer ' + this.userService.user.token}});
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.url}/products`, {headers: {Authorization: 'Bearer ' + this.userService.user.token}});
  }

  getProduct(id): Observable<any> {
    return this.http.get(`${this.url}/products/` + id, {headers: {Authorization: 'Bearer ' + this.userService.user.token}});
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.url}/checkout`, this.cart,{headers: {Authorization: 'Bearer ' + this.userService.user.token}});
  }

  addProduct(product, file: File): Observable<any> {
    const formData: any = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("price", product.price);
    formData.append("imageFile", file);
    return this.http.post(`${this.url}/products`, formData,{headers: {Authorization: 'Bearer ' + this.userService.user.token}});
  }

}
