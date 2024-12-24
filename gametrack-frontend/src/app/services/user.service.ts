import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any = null; // Variable globale pour stocker l'utilisateur

  // Définir l'utilisateur
  setUser(user: any): void {
    this.user = user;
  }

  // Récupérer l'utilisateur
  getUser(): any {
    return this.user;
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.user !== null;
  }
}