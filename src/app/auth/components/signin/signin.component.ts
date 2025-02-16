import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  //* Variable
  public formData!: FormGroup;

  //* Constructor
  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  //* Method
  public initForm() {
    this.formData = this.formBuilder.group({
      userName: new FormControl(null, Validators.required),
      passWord: new FormControl(null, Validators.required),
    });
  }

  public submitForm() {
    let userName = this.formData.get("userName")?.value;
    let passWord = this.formData.get("passWord")?.value;
    this.authServices.login(userName, passWord).then((userCredential) => {
      alert("Create Success");
      console.log("Info: ", userCredential);
    })
    .catch((err: any) => {
      alert("Create Fail: " + err?.message)
      console.error("T Error: ", err)
    })
  }
}
