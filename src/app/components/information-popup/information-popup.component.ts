import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { ICollectionItemDetailed } from '../../models/collection-item-detailed';

@Component({
  selector: 'app-information-popup',
  templateUrl: './information-popup.component.html',
  styleUrls: [ './information-popup.component.scss' ]
})
export class InformationPopupComponent implements OnInit, OnDestroy {

  collectionItem: ICollectionItemDetailed;
  isDataLoading = false;

  subscriptions: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { itemId: string },
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.getCollectionItem(this.data.itemId);
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
