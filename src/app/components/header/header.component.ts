import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { ICollectionItemDetailed } from '../../models/collection-item-detailed';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isFavoriteBtn: boolean;
  @Output() collectionFavorites = new EventEmitter<{ collectionFavorites: ICollectionItemDetailed[]; isFavoriteOpen: boolean }>();
  isFavoriteOpen = false;

  subscriptions: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goToFavorites(): void {
    this.isFavoriteOpen = !this.isFavoriteOpen;
    this.subscriptions.add(this.projectService.getFavoritesItem()
    .subscribe((collectionFavorites: ICollectionItemDetailed[]) => {
      this.collectionFavorites.emit({
        collectionFavorites,
        isFavoriteOpen: this.isFavoriteOpen
      });
    }));
  }
}
