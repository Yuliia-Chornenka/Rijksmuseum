import { Pipe, PipeTransform } from '@angular/core';
import { ICollectionItemDetailed } from '../models/collection-item-detailed';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(collectionList: ICollectionItemDetailed[], sortField: string, searchValue: string): ICollectionItemDetailed[] {
    switch (sortField.toLowerCase()) {
      case 'relevance':
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.longTitle.toLowerCase().indexOf(searchValue.toLowerCase());
          const collectionItemB = b.artObject.longTitle.toLowerCase().indexOf(searchValue.toLowerCase());
          return collectionItemA <= collectionItemB ? 1 : -1;
        });
        break;
      case 'objecttype':
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.objectTypes[0].toLowerCase();
          const collectionItemB = b.artObject.objectTypes[0].toLowerCase();
          return collectionItemA <= collectionItemB ? -1 : 1;
        });
        break;
      case 'chronologic':
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.dating.sortingDate;
          const collectionItemB = b.artObject.dating.sortingDate;
          return collectionItemA <= collectionItemB ? -1 : 1;
        });
        break;
      case 'achronologic':
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.dating.sortingDate;
          const collectionItemB = b.artObject.dating.sortingDate;
          return collectionItemA <= collectionItemB ? 1 : -1;
        });
        break;
      case 'artist':
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.principalMaker.toLowerCase();
          const collectionItemB = b.artObject.principalMaker.toLowerCase();
          return collectionItemA <= collectionItemB ? -1 : 1;
        });
        break;
      case 'artistdesc':
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.principalMaker.toLowerCase();
          const collectionItemB = b.artObject.principalMaker.toLowerCase();
          return collectionItemA <= collectionItemB ? 1 : -1;
        });
        break;
      default:
        collectionList.sort((a: ICollectionItemDetailed, b: ICollectionItemDetailed) => {
          const collectionItemA = a.artObject.objectTypes[0].toLowerCase();
          const collectionItemB = b.artObject.objectTypes[0].toLowerCase();
          return collectionItemA <= collectionItemB ? -1 : 1;
        });
    }
    return collectionList;
  }
}
