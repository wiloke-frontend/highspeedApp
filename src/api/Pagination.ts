type Endpoint = string;

export interface PaginationParams {
  postsPerPage: number;
  page: number;
}

export interface PaginationItem<TEndpoint extends Endpoint = Endpoint> {
  endpoint: TEndpoint;
  params: PaginationParams;
}

export interface Pagination<TEndpoint extends Endpoint = Endpoint> {
  next: PaginationItem<TEndpoint>;
  prev: PaginationItem<TEndpoint>;
  maxNumPages: number;
}
