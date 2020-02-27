import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart: any[]
  totalAmount: number = 0

  public updateAmount() {
    this.totalAmount = 0

    this.cart.forEach((item) => {
      this.totalAmount += item.price
    })
  }

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.cart = this.webService.cart
    this.updateAmount()
  }

  onRemove(product) {
    this.webService.removeFromCart(product)
    this.updateAmount()
  }

  onCheckout() {
    if(!this.cart.length) {
      return
    }

    this.webService.checkout().subscribe(res => {
      alert(`$${this.totalAmount} paid successfully`);
      console.log(res);
    })
  }
}
