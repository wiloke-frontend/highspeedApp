import { FeatherNameType } from 'shared/types/FeatherNameType';

export interface MenuItem {
  key: string;
  label: string;
  iconName: FeatherNameType | '';
  enable: boolean;
  screen: string;
  type: 'screen' | 'webview';
}

export interface Menu {
  status: string;
  data: MenuItem[];
}
