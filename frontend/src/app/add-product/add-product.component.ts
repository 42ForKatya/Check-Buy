import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {WebService} from "../web.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
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
      quantity: [0, Validators.required],
      price: [0, Validators.required],
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
      this.webService.addProduct(this.productForm.value, this.productForm.value.imageFile).subscribe(res => {
        alert('Product saved successfully')
      }, err => {
        this.errorText = 'some error occured..';
      })
    }
  }

}
