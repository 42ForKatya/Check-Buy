import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  menuItems = []
  @ViewChild('drawer', {static: false}) drawer: any;

  constructor(public userService: UserService,
              private router: Router) { }

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
      { label: 'Корзина', icon: 'send', activated: false }
    ]

    if(this.userService.user && this.userService.user.user.isAdmin) {
      this.menuItems.push({
        label: 'Добавить продукт', icon: 'add', activated: false
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

  onMenuItemClick(item) {
    this.drawerOpenClose()

    if(item.label === 'Новости') {
      this.router.navigateByUrl('/news')
    }else if(item.label === 'Продукты') {
      this.router.navigateByUrl('/products')
    }else if(item.label === 'Добавить продукт') {
      this.router.navigateByUrl('/add-product')
    } else if(item.label === 'Корзина') {
      this.router.navigateByUrl('/checkout')
    }
  }

}
