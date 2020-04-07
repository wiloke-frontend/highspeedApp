import { TypeProp } from 'components/Magazine/Magazine';
import { HomeDataItem } from 'api/Home';

export const getMagazineType = (moduleType: HomeDataItem['moduleType']): { firstType: TypeProp; type: TypeProp } => {
  switch (moduleType) {
    case 'appMagazine01':
      return {
        firstType: 'standard1',
        type: 'grid1',
      };
    case 'appMagazine02':
      return {
        firstType: 'standard2',
        type: 'grid2',
      };
    case 'appMagazine03':
      return {
        firstType: 'standard1',
        type: 'list1',
      };
    case 'appMagazine04':
      return {
        firstType: 'standard2',
        type: 'list2',
      };
    case 'appMagazine05':
      return {
        firstType: 'standard1',
        type: 'list3',
      };
    case 'appMagazine06':
      return {
        firstType: 'standard1',
        type: 'list4',
      };
    case 'appMagazine07':
      return {
        firstType: 'standard2',
        type: 'list3',
      };
    case 'appMagazine08':
      return {
        firstType: 'standard2',
        type: 'list4',
      };
    case 'appStandard01':
      return {
        firstType: 'standard1',
        type: 'standard1',
      };
    case 'appStandard02':
      return {
        firstType: 'standard2',
        type: 'standard2',
      };
    case 'appList01':
      return {
        firstType: 'list1',
        type: 'list1',
      };
    case 'appList02':
      return {
        firstType: 'list2',
        type: 'list2',
      };
    case 'appList03':
      return {
        firstType: 'list3',
        type: 'list3',
      };
    case 'appList04':
      return {
        firstType: 'list4',
        type: 'list4',
      };
    case 'appGrid01':
      return {
        firstType: 'grid1',
        type: 'grid1',
      };
    case 'appGrid02':
      return {
        firstType: 'grid2',
        type: 'grid2',
      };
    default:
      return {
        firstType: 'standard1',
        type: 'grid1',
      };
  }
};
