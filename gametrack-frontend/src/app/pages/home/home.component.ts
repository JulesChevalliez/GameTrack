import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(){
    // if(!this.userService.isLoggedIn()){
    //   this.router.navigate(["/login"]);
    // }
  }
}
