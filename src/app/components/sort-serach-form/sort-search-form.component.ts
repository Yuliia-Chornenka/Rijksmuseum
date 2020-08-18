import { Component, OnDestroy, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { ICollection } from '../../models/collection';
import { ISearchResults } from '../../models/search-results';

@Component({
  selector: 'app-sort-search-form',
  templateUrl: './sort-search-form.component.html',
  styleUrls: [ './sort-search-form.component.scss' ]
})
export class SortSearchFormComponent implements OnInit, OnDestroy {

  pageSize = 10;
  pageNumber = 1;
  formSortSearch: FormGroup;
  sortingFields = [ 'relevance', 'type', 'chronologically (oldest first)',
    'chronologically (newest first)', 'artist (a-z)', 'artist (z-a)' ];
  @Output() searchedCollectionEvent = new EventEmitter<ISearchResults>();

  subscriptions: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let query = '';
    let sortField = 'type';

    this.route.queryParams.subscribe((queryParam: Params) => {
      query = queryParam.q ? queryParam.q : '';
      sortField = queryParam.s ? getSortFieldQuery(queryParam.s) : 'type';

      this.formSortSearch = new FormGroup({
        searchValue: new FormControl(query),
        sortByField: new FormControl(sortField)
      });

      this.getSortField();
    });


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCollection(): void {
    const {searchValue, sortByField} = this.formSortSearch.controls;
    const searchQuery = searchValue.value.toLowerCase();
    const sortField = getSortFieldValue(sortByField.value);

    this.subscriptions.add(this.projectService.getCollection(this.pageSize, this.pageNumber, sortField, searchQuery)
      .subscribe((searchedCollection: ICollection) => {
           this.searchedCollectionEvent.emit({
             searchedCollection,
             searchQuery,
             sortField
           });
         }));
  }


  onSubmit(): void {
    this.getCollection();
  }

  getSortField(): void {
    this.formSortSearch.get('sortByField').valueChanges.subscribe(() => {
      this.getCollection();
    });
  }

  resetForm(): void {
    this.formSortSearch.setValue({searchValue: '', sortByField: 'type'});
  }
}

function getSortFieldValue(value) {
  let sortField = '';

  switch (value.toLowerCase()) {
    case 'relevance':
      sortField = 'relevance';
      break;
    case 'type':
      sortField = 'objecttype';
      break;
    case 'chronologically (oldest first)':
      sortField = 'chronologic';
      break;
    case 'chronologically (newest first)':
      sortField = 'achronologic';
      break;
    case 'artist (a-z)':
      sortField = 'artist';
      break;
    case 'artist (z-a)':
      sortField = 'artistdesc';
      break;
    default:
      sortField = 'objecttype';
  }
  return sortField;
}


function getSortFieldQuery(valueQuery) {
  let sortFieldQuery = '';

  switch (valueQuery.toLowerCase()) {
    case 'relevance':
      sortFieldQuery = 'relevance';
      break;
    case 'objecttype':
      sortFieldQuery = 'type';
      break;
    case 'chronologic':
      sortFieldQuery = 'chronologically (oldest first)';
      break;
    case 'achronologic':
      sortFieldQuery = 'chronologically (newest first)';
      break;
    case 'artist':
      sortFieldQuery = 'artist (a-z)';
      break;
    case 'artistdesc':
      sortFieldQuery = 'artist (z-a)';
      break;
    default:
      sortFieldQuery = 'type';
  }
  return sortFieldQuery;
}
