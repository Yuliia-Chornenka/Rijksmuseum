import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICollectionItemDetailed } from '../../models/collection-item-detailed';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})
export class BtnFavoriteComponent implements OnInit, OnDestroy {

  @Input() itemId: string;
  @Input() collectionItem: ICollectionItemDetailed;
  isItemFavorite: ICollectionItemDetailed | boolean;

  subscriptions: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getFavoritesItem(this.itemId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getFavoritesItem(id: string): void {
    this.subscriptions.add(this.projectService.getFavoritesItem()
      .subscribe((favorites: ICollectionItemDetailed[]) => {
      this.isItemFavorite = favorites.find( (favoriteItem: ICollectionItemDetailed) => {
        return favoriteItem.artObject.objectNumber === id;
      });
    }));
  }

  toogleFavoriteItem(item: ICollectionItemDetailed): void {
    if (this.isItemFavorite) {
      this.subscriptions.add(this.projectService.deleteFavoriteItem(item).subscribe(() => {
        this.isItemFavorite = false;
      }));
    } else {
      this.subscriptions.add(this.projectService.addFavoriteItem(item).subscribe(() => {
        this.isItemFavorite = true;
      }));
    }
  }
}
