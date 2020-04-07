interface Image {
  thumbnail: string;
  medium: string;
  large: string;
  preview: string;
}

export interface HomeSectionNavParams {
  id: number;
  moduleOrder: number;
  type: string;
}

export interface HomeSectionNavDataItem {
  id: number;
  name: string;
  endpoint: string;
  color: string;
  params: HomeSectionNavParams;
  featuredImage: Image;
  iconImage: Image;
}

export interface HomeSectionNavigation {
  status: string;
  data: HomeSectionNavDataItem[];
}
