import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {WebService} from "../web.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any

  constructor(private route: ActivatedRoute,
              private webService: WebService,
              private router: Router,
              private _sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.webService.getProduct(params.id).subscribe(res => {
        this.product = res.product
      })
    });
  }

  onAddToCartClick(product) {
    this.webService.addToCart(product);
  }

  onCheckoutClick() {
    this.router.navigateByUrl('/checkout');
  }

  getImg(str) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + str);
  }
}
