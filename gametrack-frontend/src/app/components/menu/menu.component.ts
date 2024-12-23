import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    Avatar,
    IconField,
    InputIcon,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {


  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(){
    console.log(this.userService.isLoggedIn());
  }
}
