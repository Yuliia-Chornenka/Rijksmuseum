import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ICollection } from '../models/collection';
import { ICollectionItemDetailed } from '../models/collection-item-detailed';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private showsUrl = 'https://www.rijksmuseum.nl/api/en/collection';
  private key = 'TTh41RCH';
  private favorites = localStorage.getItem('favorites');


  constructor(private http: HttpClient) {
    if (!this.favorites) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }

  getCollection(itemsPerPage, pageNumber, sortField, query): Observable<ICollection> {
    return this.http.get<ICollection>(`${this.showsUrl}/?key=${this.key}&q=${query}
    &s=${sortField}&ps=${itemsPerPage}&p=${pageNumber}`);
  }

  getCollectionItem(id): Observable<ICollectionItemDetailed> {
    return this.http.get<ICollectionItemDetailed>(`${this.showsUrl}/${id}?key=${this.key}`);
  }

  addFavoriteItem(item): Observable<ICollectionItemDetailed> {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return of(item);
  }

  deleteFavoriteItem(item: ICollectionItemDetailed): Observable<ICollectionItemDetailed> {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const itemToRemove = favorites.findIndex((favorite: ICollectionItemDetailed) => {
      return favorite.artObject.objectNumber === item.artObject.objectNumber;
    });

    if (itemToRemove >= 0) {
      favorites.splice(itemToRemove, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    return of(item);
  }

  getFavoritesItem(): Observable<ICollectionItemDetailed[]> {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    return of(favorites);
  }
}
