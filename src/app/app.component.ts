import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public authService: AuthService,private router:Router) { }
  ngOnInit() {
  }
  logOut() {
    this.authService.user = undefined;
    sessionStorage.clear();
    this.router.navigate([''])
  }

}
