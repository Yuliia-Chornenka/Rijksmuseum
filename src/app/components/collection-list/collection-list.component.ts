import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICollectionItem } from '../../models/collection-item';
import { InformationPopupComponent } from '../information-popup/information-popup.component';
import { ProjectService } from '../../services/project.service';
import { ICollectionItemDetailed } from '../../models/collection-item-detailed';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: [ './collection-list.component.scss' ]
})
export class CollectionListComponent implements OnInit {

  @Input() collectionList: ICollectionItem[];
  @Input() collectionListDetailed: ICollectionItemDetailed[];
  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageNumber: number;
  @Input() pageSizeOptions: [ number ];
  @Input() query: string;
  @Input() sortField: string;
  @Input() type: string;
  @Input() tagWhat: string;
  @Input() tagWhere: string;
  @Input() tagWho: string;
  @Input() getNextPageCollection: (event) => PageEvent;
  @Input() isFavoriteOpen: boolean;
  pageEvent: PageEvent;
  subscriptions: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    public router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openDialog(id: string): void {
    this.dialog.open(InformationPopupComponent, {
      disableClose: true,
      data: { itemId: id }
    });
  }
}
