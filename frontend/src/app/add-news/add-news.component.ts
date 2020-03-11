import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {WebService} from "../web.service";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  productForm: FormGroup
  errorText: string = ''

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private webService: WebService,
              private cd: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [null, Validators.required]
    });
  }

  keyDownFunction(event) {
    if(event.keyCode === 13) {
      this.onSubmit()
    }
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({
      imageFile: file
    });
    this.productForm.get('imageFile').updateValueAndValidity()
  }

  onSubmit() {
    this.errorText = '';

    if (this.productForm.valid) {
      this.webService.addNews(this.productForm.value, this.productForm.value.imageFile).subscribe(res => {
        alert('Новости добавлены')
      }, err => {
        this.errorText = 'Произошла неизвестная ошибка';
      })
    }
  }

}
