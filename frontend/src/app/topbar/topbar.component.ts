import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {WebService} from '../web.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  menuItems = []
  @ViewChild('drawer', {static: false}) drawer: any;

  constructor(public userService: UserService,
              private router: Router,
              private webService: WebService) { }

  ngOnInit() {
    this.createMenuItems()

    this.userService.loggedIn.subscribe(res => {
      this.createMenuItems()
    })
  }

  createMenuItems() {
    this.menuItems = [
      { label: 'Новости', icon: 'view_quilt', activated: false },
      { label: 'Продукты', icon: 'list', activated: false },
      { label: 'Оплата', icon: 'send', activated: false }
    ]

    if(this.userService.user && this.userService.user.user.isAdmin) {
      this.menuItems.push({
        label: 'Добавить продукт', icon: 'add', activated: false
      })
      this.menuItems.push({
        label: 'Добавить новости', icon: 'add', activated: false
      })
    }
  }

  drawerOpenClose() {
    this.drawer.open = !this.drawer.open
  }

  onLogOut() {
    this.userService.logout().subscribe(res => {
      window.localStorage.removeItem('user')
      this.router.navigateByUrl('/login')
    })
  }

  async onNFCScan() {
    try {
      // @ts-ignore
      const reader = new NDEFReader();
      reader.addEventListener("reading", ev => {
        console.log('reading this from NFC => ' + ev.message.toString());
        const product = this.webService.productsCache.find(product => product._id === ev.message.toString());
        if(product) {
          this.router.navigate(['product', {id: product._id}]);
        }else {
          console.log('product not found having id => ' + ev.message.toString());
        }
      });
      // @ts-ignore
      navigator.permissions.query({ name: 'nfc' }).then(async permission => {
        if (permission.state == "granted") {
          reader.scan({ recordType: "mime" });
        }
      });
    } catch(err) {
      console.error("Произошла ошибка в работе с NFC ", err);
    }
  }

  onMenuItemClick(item) {
    this.drawerOpenClose()

    if(item.label === 'Новости') {
      this.router.navigateByUrl('/news')
    }else if(item.label === 'Витрина') {
      this.router.navigateByUrl('/products')
    }else if(item.label === 'Добавить продукт') {
      this.router.navigateByUrl('/add-product')
    } else if(item.label === 'Оплата') {
      this.router.navigateByUrl('/checkout')
    } else if(item.label === 'Добавить новости') {
      this.router.navigateByUrl('/add-news')
    }
  }

}
