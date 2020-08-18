import { ICollectionItem } from './collection-item';

export interface ICollection {
  artObjects: Array<ICollectionItem>;
  count: number;
  countFacets: {};
  elapsedMilliseconds: number;
  facets: Array<object>;
}
