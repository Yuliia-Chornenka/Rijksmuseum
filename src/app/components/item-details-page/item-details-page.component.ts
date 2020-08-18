import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { ICollectionItemDetailed } from '../../models/collection-item-detailed';

@Component({
  selector: 'app-item-details-page',
  templateUrl: './item-details-page.component.html',
  styleUrls: ['./item-details-page.component.scss']
})
export class ItemDetailsPageComponent implements OnInit, OnDestroy {

  collectionItem: ICollectionItemDetailed;
  itemId: string;
  isDataLoading = false;

  subscriptions: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.itemId = params.id);
    this.getCollectionItem(this.itemId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCollectionItem(id: string): void {
    this.isDataLoading = true;
    this.subscriptions.add(this.projectService.getCollectionItem(id)
      .subscribe((collectionItem: ICollectionItemDetailed) => {
      this.collectionItem = collectionItem;
      this.isDataLoading = false;
    }));
  }
}
