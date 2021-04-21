import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });
  users = [
    { userName: 'test', password: 'test', role: 'user', roleId: 1 },
    { userName: 'test1', password: 'test', role: 'user', roleId: 1 },
    { userName: 'test2', password: 'test', role: 'user', roleId: 1 },
    { userName: 'admin', password: 'admin', role: 'admin', roleId: 2 }];
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    sessionStorage.removeItem('user');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.users.find(x => x.userName === this.loginForm.controls.userName.value &&
        x.password === this.loginForm.controls.password.value);
      if (data) {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.authService.user = data;
        this.router.navigate(['/products']);
      } else {
        alert('Please enter valid credentials.');
      }
    }
  }

}
