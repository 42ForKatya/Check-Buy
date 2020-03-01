import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[];

  constructor(private webService: WebService,
              private router: Router,
              private _sanitizer: DomSanitizer,
              private userService: UserService,
              private location: Location) { }

  ngOnInit() {
    this.webService.getProducts().subscribe(res => {
      this.products = res.products;
    })
  }

  onCardClick(product) {
    this.router.navigate(['product', {id: product._id}]);
  }

  onAddToCartClick(product) {
    // For NFC
    // Calling API with productID
    console.log('Calling NFC add to cart api with productId');
    console.log(product._id);

    this.writeToNFC(product);
    this.webService.addToCart(product).subscribe();
  }

  onProductRemove(product) {
    this.webService.removeProduct(product._id).subscribe(() => {
      location.reload();
    });
  }

  getImg(str) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + str);
  }

  async writeToNFC(product) {
    try {
      // @ts-ignore
      const writer = new NDEFWriter();
      // @ts-ignore
      navigator.permissions.query({ name: 'nfc' }).then(async permission => {
        if (permission.state == "granted") {
          await writer.write(product._id, {
            ignoreRead: true,
            overwrite: true,
          });
        }
      });
    } catch (err) {
      console.log('error writing to NFC', err);
    }
  }
}
