import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';


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
    FormsModule,
    PaginatorModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  searchResult: any = [];
  searchTerm: any = "";
  page: any = 0;
  limit: any = 10;
  offset: any = 0;
  total: any = 0;
  loading: boolean = false;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(){
    console.log(this.userService.isLoggedIn());
  }

  searchField(){
    console.log(this.searchTerm);
    this.loading = true;
    this.gameService.searchGame(this.searchTerm, this.limit, this.offset).subscribe((res) => {
      console.log(res);
      this.searchResult = res
      this.total = parseInt(res.total);
      this.loading = false;
    });
  }

  goToGamePage(gameId: any){
    this.router.navigate(['/game/'+gameId]);
    this.searchResult = [];
  }

  onPageChange(event: any){
    console.log(event);
    this.page = event.page;
    this.offset = event.first;
    this.limit = event.rows;
    this.searchField();
  }
}
