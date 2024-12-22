import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { GameService } from '../../services/game.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { GameOverviewComponent } from '../../components/game-overview/game-overview.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-game',
  imports: [
    HeroComponent,
    DividerModule,
    GameOverviewComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  gameId: string | null = null;

  pageNameHero = "Game details";
  pageMsgHero = "Manage your video game collection, share your passion, stay informed.";
  btnListHero = [
    {
      id: "overview",
      name: "Game Overview"
    },
    {
      id: "user-review",
      name: "User Reviews"
    },
    {
      id: "my-review",
      name: "My Review"
    },
    {
      id: "notifications",
      name: "Actions and Notifications"
    },
  ];
  gameScreenshots: Array<Object> = [];
  gameInfos: any;
  releaseDate: any;
  gameGenres: any = [];
  gameSummary: any;
  gameDeveloper: any;
  gamePlatforms: any;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.gameService.getGameById(this.gameId).subscribe((res) => {
      console.log(res);

      this.gameInfos = res;

      this.releaseDate = new Date(this.gameInfos[0].first_release_date * 1000).toLocaleDateString("fr");
      this.gameSummary = res[0]?.summary;

      if (res[0]?.screenshots?.length) {
        this.gameScreenshots = res[0].screenshots.map((screenshot: any) => ({
          itemImageSrc: `https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.jpg`,
          alt: `Screenshot of ${res[0].name}`,
          title: `${res[0].name} Screenshot`,
        }));
      }

      if (res[0]?.genres?.length) {
        this.gameGenres = res[0].genres.map((genre: any) => ({
          name: genre.name
        }));
      }

      if (res[0]?.involved_companies?.length) {
        this.gameDeveloper = res[0].involved_companies.filter((company: any) =>  company.developer );
      }

      if (res[0]?.platforms?.length) {
        this.gamePlatforms = res[0].platforms.map((platform: any) => ({
          name: platform.abbreviation,
          logo: `https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`
        }));
      }

    })
  }

}
