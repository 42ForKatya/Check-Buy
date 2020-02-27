import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  errorText: string = ''

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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

    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/login');
      }, err => {
        this.errorText = 'some error occured..';
      })
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
