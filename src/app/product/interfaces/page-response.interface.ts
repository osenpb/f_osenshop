export interface PageResponse {
  content:          Content[];
  pageable:         Pageable;
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

export interface Content {
  id:          number;
  name:        string;
  description: string;
  price:       number;
  stock:       number;
  imageUrl:    string;
  category:    Category;
  isActive:    boolean;
}

export interface Category {
  id:   number;
  name: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  unsorted: boolean;
  sorted:   boolean;
}
