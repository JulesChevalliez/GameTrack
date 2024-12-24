import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getGameById(id: any): Observable<any> {
    const apiUrl = environment.API_URL;

    return this.httpClient.get(environment.API_URL+"games/"+id);

    // fetch(apiUrl+"games/"+id,
    //   { 
    //     method: 'GET',
    //     headers: {},
    //   }
    // ).then(response => {
    //     res = response.json();
    // }).catch(err => {
    //     res = err;
    // });

    // return of(res)
  }

  searchGame(term: any, limit: any, offset: any): Observable<any> {
    const apiUrl = environment.API_URL;

    return this.httpClient.post(environment.API_URL+"games/search/"+term, {limit: limit, offset: offset});
  }
 }
