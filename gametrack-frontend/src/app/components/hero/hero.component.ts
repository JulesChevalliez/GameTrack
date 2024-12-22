import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() pageNameHero: any;
  @Input() pageMsgHero: any;
  @Input() btnListHero: any;
}
