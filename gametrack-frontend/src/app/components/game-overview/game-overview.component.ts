import { Component, Input, ViewChild } from '@angular/core';
import { Galleria, GalleriaModule, GalleriaTemplates } from 'primeng/galleria';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-game-overview',
  imports: [
    GalleriaModule,
    Tag,
    Button,
    
  ],
  templateUrl: './game-overview.component.html',
  styleUrl: './game-overview.component.scss'
})
export class GameOverviewComponent {
  @Input() gameScreenshots: any[] = [];
  @Input() gameInfos: any;
  @Input() releaseDate: any;
  @Input() gameGenres: any;
  @Input() gameSummary: any;
  @Input() gameDeveloper: any;
  @Input() gamePlatforms: any;

  @ViewChild('galleria') galleria!: GalleriaTemplates;

  fullscreenVisible: boolean = false;
  activeIndex: any;

  ngAfterViewInit(){
    console.log(this.gameInfos);
    console.log(this.gameSummary);
    
  }

  openFullscreen() {
    this.fullscreenVisible = true;
  }

  onIndexChange(index: any){
    console.log("INDEX : ", index);
    this.activeIndex = index;
  }
}
