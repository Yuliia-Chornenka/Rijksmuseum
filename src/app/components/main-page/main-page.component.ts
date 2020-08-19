import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { ICollection } from '../../models/collection';
import { ICollectionItem } from '../../models/collection-item';
import { ISearchResults } from '../../models/search-results';
import { ICollectionItemDetailed } from '../../models/collection-item-detailed';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  collectionList: ICollectionItem[] = [];
  collectionListDetailed: ICollectionItemDetailed[];
  length = 0;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions = [10, 50, 100];
  sortField = '';
  query = '';
  type = '';
  tagWhat = '';
  tagWhere = '';
  tagWho = '';
  searchedCollectionCount = 1;
  isDataLoading = false;
  isFavoriteOpen: boolean;

  subscriptions: Subscription = new Subscription();

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParam: Params) => {
      this.pageSize = queryParam.ps;
      this.pageNumber = queryParam.p;
      this.query = queryParam.q ? queryParam.q : '';
      this.sortField = queryParam.s ? queryParam.s : 'objecttype';
      this.type = queryParam.type ? queryParam.type : '';
      this.tagWhat = queryParam.tagWhat ? queryParam.tagWhat : '';
      this.tagWhere = queryParam.tagWhere ? queryParam.tagWhere : '';
      this.tagWho = queryParam.tagWho ? queryParam.tagWho : '';

      if (!queryParam.ps) {
        this.router.navigate(['/'], { queryParams: {
            ps: 10,
            p: 1,
            q: this.query,
            type: this.type,
            s: this.sortField,
          }});
      }
      this.getCollection();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCollection(): void {
    this.isDataLoading = true;
    this.subscriptions.add(this.projectService.getCollection
      (this.pageSize, this.pageNumber, this.sortField, this.query, this.type, this.tagWhat, this.tagWhere, this.tagWho)
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

    this.router.navigate(['/'], { queryParams: {
        ps: 10,
        p: 1,
        q: event.searchQuery,
        type: this.type,
        tagWhat: this.tagWhat,
        tagWhere: this.tagWhere,
        tagWho: this.tagWho,
        s: event.sortField,
      }});
  }

   getNextPageCollection(event: PageEvent): PageEvent {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;

    this.subscriptions.add(this.projectService.getCollection
      (this.pageSize, this.pageNumber, this.sortField, this.query, this.type, this.tagWhat, this.tagWhere, this.tagWho)
      .subscribe((collection: ICollection) => {
      this.collectionList = collection.artObjects;
      this.length = collection.count > 10000 ? 10000 : collection.count;
      this.router.navigate(['/'], { queryParams: {
              ps: this.pageSize,
              p: this.pageNumber,
              q: this.query,
              type: this.type,
              tagWhat: this.tagWhat,
              tagWhere: this.tagWhere,
              tagWho: this.tagWho,
              s: this.sortField
      }});
    }));
    return new PageEvent();
  }

  getCollectionFavorites(event: {collectionFavorites: ICollectionItemDetailed[]; isFavoriteOpen: boolean}): void {
    this.collectionListDetailed = event.collectionFavorites;
    this.isFavoriteOpen = event.isFavoriteOpen;
    this.router.navigate(['/'], { queryParams: { ps: 10, p: 1, q: '', s: 'objecttype' }});
  }

  removeSelectedTag(): void {
    this.type = '';
    this.router.navigate(['/'], { queryParams: {
        ps: 10,
        p: 1,
        q: this.query,
        type: '',
        tagWhat: '',
        tagWhere: '',
        tagWho: '',
        s: this.sortField,
      }});
  }
}
