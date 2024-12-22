import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'collection', component: CollectionComponent},
    { path: 'game/:id', component: GameComponent},
];
