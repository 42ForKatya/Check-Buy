import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errorText: string = ''

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  keyDownFunction(event) {
    if(event.keyCode === 13) {
      this.onSubmit()
    }
  }

  onSubmit() {
    this.errorText = '';

    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(res => {
        this.userService.user = res;
        this.userService.loggedIn.emit()
        this.router.navigateByUrl('/news');
      }, err => {
        this.errorText = 'Произошла неизвестная ошибка';
      })
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

}
