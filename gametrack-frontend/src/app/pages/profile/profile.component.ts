import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(){
    if(!this.userService.isLoggedIn()){
      this.router.navigate(["/login"]);
    }
  }

  logout(){
    this.authService.logout().subscribe((res: any) => {
      console.log(res);
      this.userService.setUser(null);
      this.router.navigate(["/login"]);
    })
  }
}
