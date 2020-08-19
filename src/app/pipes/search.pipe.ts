import { Pipe, PipeTransform } from '@angular/core';
import { ICollectionItemDetailed } from '../models/collection-item-detailed';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(collectionList: ICollectionItemDetailed[], searchValue: string): ICollectionItemDetailed[] {
    if (!collectionList.length || searchValue === '') {
      return collectionList;
    }
    return collectionList.filter((collectionItem: ICollectionItemDetailed) => {
      const collectionItemToString = JSON.stringify(collectionItem.artObject).toLowerCase();
      return collectionItemToString.indexOf(searchValue.toLowerCase()) !== -1;
    });
  }
}
