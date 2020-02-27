import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {WebService} from "../web.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any

  constructor(private route: ActivatedRoute,
              private webService: WebService,
              private router: Router) { }

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
}
