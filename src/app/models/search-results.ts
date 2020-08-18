import { ICollection } from './collection';

export interface ISearchResults {
  searchedCollection: ICollection;
  searchQuery: string;
  sortField: string;
}
