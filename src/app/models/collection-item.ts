export interface ICollectionItem {
  hasImage: boolean;
  headerImage: {
    guid: string;
    height: number;
    offsetPercentageX: number;
    offsetPercentageY: number;
    url: string;
    width: number
  };
  id: string;
  links: object;
  longTitle: string;
  objectNumber: string;
  permitDownload: boolean;
  principalOrFirstMaker: string;
  productionPlaces: [];
  showImage: boolean;
  title: string;
  webImage: object;
}
