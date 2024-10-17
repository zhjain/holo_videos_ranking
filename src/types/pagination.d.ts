declare interface PaginatedResponse<T> {
  records: T[];
  current: number;
  size: number;
  total: number;
}

declare interface PaginationInfo {
  current: number;
  limit: number;
  total: number;
}

declare interface PaginatedRequest {
  _page: number;
  _limit: number;
  _sort: string;
  _order: "asc" | "desc";
  _q: string;
}
