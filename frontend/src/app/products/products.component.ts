import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[];

  constructor(private webService: WebService,
              private router: Router,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.webService.getProducts().subscribe(res => {
      this.products = res.products;
    })
  }

  onCardClick(product) {
    this.router.navigate(['product', {id: product._id}]);
  }

  onAddToCartClick(product) {
    this.webService.addToCart(product);

    // Do NFC thing here
    // This is the product id => product._id
    console.log('Do the NFC things here');
    console.log(product._id);
  }

  getImg(str) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + str);
  }
}
