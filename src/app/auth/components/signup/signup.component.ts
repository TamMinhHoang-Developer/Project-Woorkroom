import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  //* OPT
  public phoneNumber: string = '';
  public otpCode: string = '';
  public isOtpSent: boolean = false;

  //* Constructor
  constructor(private authServices: AuthService) {}

  ngOnInit() {
    this.authServices.setupReCaptcha('recaptcha-container');
  }

  //* Method
  public handlerLoginEmail() {
    this.authServices.register("test@gmail.com", "123456")
  }

  public sendOtp() {
    this.authServices.sendOtp(this.phoneNumber).then(() => {
      this.isOtpSent = true;
    }).catch(error => {
      alert(error.message);
    });
  }

  public verifyOtp() {
    this.authServices.verifyOtp(this.otpCode).then(() => {
      alert('Đăng nhập thành công!');
    }).catch(error => {
      alert(error.message);
    });
  }
}
