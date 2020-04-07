export interface Category {
  id: number;
  name: string;
  taxonomy: string;
  endpoint: string;
  color: string;
  iconImage: {
    thumbnail: string;
    medium: string;
    large: string;
    preview: string;
  };
  featuredImage: {
    thumbnail: string;
    medium: string;
    large: string;
    preview: string;
  };
}

export interface Categories {
  status: string;
  data: Category[];
}
