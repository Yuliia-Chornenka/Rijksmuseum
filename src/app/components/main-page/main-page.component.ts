import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { ICollection } from '../../models/collection';
import { ICollectionItem } from '../../models/collection-item';
import { ISearchResults } from '../../models/search-results';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  collectionList: ICollectionItem[] = [];
  length = 0;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions = [10, 50, 100];
  sortField = '';
  query = '';
  searchedCollectionCount = 1;
  isDataLoading = false;

  subscriptions: Subscription = new Subscription();

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParam: Params) => {
      this.pageSize = queryParam.ps;
      this.pageNumber = queryParam.p;
      this.query = queryParam.q ? queryParam.q : '';
      this.sortField = queryParam.s ? queryParam.s : 'objecttype';

      if (!queryParam.ps) {
        this.router.navigate(['/'], { queryParams:
            { ps: 10, p: 1, q: this.query, s: this.sortField }});
      }

      this.getCollection();

    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCollection(): void {
    this.isDataLoading = true;
    this.subscriptions.add(this.projectService.getCollection(this.pageSize, this.pageNumber, this.sortField, this.query)
    .subscribe((collection: ICollection) => {
      this.collectionList = collection.artObjects;
      this.length = collection.count > 10000 ? 10000 : collection.count;
      this.isDataLoading = false;
      this.searchedCollectionCount = collection.count;
    }));
  }

  getSearchedCollection(event: ISearchResults): void {
    this.searchedCollectionCount = event.searchedCollection.count;
    this.collectionList = event.searchedCollection.artObjects;
    this.length = event.searchedCollection.count > 10000 ? 10000 : event.searchedCollection.count;
    this.query = event.searchQuery;
    this.sortField = event.sortField;

    this.router.navigate(['/'], { queryParams:
        { ps: 10, p: 1, q: event.searchQuery, s: event.sortField }});
  }

   getNextPageCollection(event: PageEvent): PageEvent {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;

    this.subscriptions.add(this.projectService.getCollection(this.pageSize, this.pageNumber, this.sortField, this.query)
      .subscribe((collection: ICollection) => {
        this.collectionList = collection.artObjects;
        this.length = collection.count > 10000 ? 10000 : collection.count;
        this.router.navigate(['/'], { queryParams:
            { ps: this.pageSize, p: this.pageNumber, q: this.query, s: this.sortField }});
    }));
    return new PageEvent();
  }
}