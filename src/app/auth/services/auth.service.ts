import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public recaptchaVerifier!: RecaptchaVerifier;
  public confirmationResult!: ConfirmationResult;

  constructor(private auth: Auth) {}

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {
    return signOut(this.auth);
  }

  public getCurrentUser() {
    return this.auth.currentUser;
  }

  public setupReCaptcha(containerId: string) {
    if (!this.recaptchaVerifier) {
      // Chỉ khởi tạo nếu chưa tồn tại
      this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
        size: 'invisible',
      });
    }
  }

  async sendOtp(phoneNumber: string) {
    this.setupReCaptcha('recaptcha-container'); // ID của element chứa reCAPTCHA
    return signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        return true;
      })
      .catch((error) => {
        console.error('OTP Sending Error:', error);
        throw error;
      });
  }

  async verifyOtp(code: string) {
    if (!this.confirmationResult)
      throw new Error('No confirmation result available');
    return this.confirmationResult
      .confirm(code)
      .then((result) => {
        return result.user;
      })
      .catch((error) => {
        console.error('OTP Verification Error:', error);
        throw error;
      });
  }
}
