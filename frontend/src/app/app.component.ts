import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {WebService} from './web.service';
import {timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  pollingStarted = false;

  constructor(private router: Router,
              private userService: UserService,
              private webService: WebService,) {
  }

  ngOnInit() {
    const user = window.localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/login');
    }

    this.webService.getProducts().subscribe(res => {
      this.webService.productsCache = res.products;
    })

    this.startNFCPolling();
  }

  startNFCPolling() {
    if(this.pollingStarted) {
      return
    }

    timer(0, 500).subscribe(() => {
      const productId = this.checkProduct();

      // If productId is null just return
      if (!productId) {
        return
      }

      // If productId is present in DB, goto product page
      const product = this.webService.productsCache.find(product => product._id === productId);
      if(product) {
        this.router.navigate(['product', {id: product._id}]);
      }
    });

    this.pollingStarted = true
  }

  checkProduct() {
    return null;
  }
}
