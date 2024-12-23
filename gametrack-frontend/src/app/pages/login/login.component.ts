import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  createAccount: boolean = false;

  isLoggeding: any = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Formulaire d'inscription
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  // Validation de correspondance des mots de passe
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: any) => {
        console.log(res);
        if(res.user) {
          this.router.navigate(['/collection']);
          this.userService.setUser(res.user);
        }
      })
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Register Data:', this.registerForm.value);
      this.authService.register(this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email).subscribe((res: any) => {
        console.log(res);
        if(res.user) this.router.navigate(['/collection']);
      })
    }
  }
}