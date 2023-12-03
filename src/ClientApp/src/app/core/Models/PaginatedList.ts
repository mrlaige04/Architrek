export class PaginatedList<T> {
  public totalPages: number;
  constructor(public items: Array<T>, public totalCount: number, public pageNumber: number, public pageSize: number) {
    this.totalPages = Math.ceil(totalCount / pageSize);

    this.hasPreviousPage = pageNumber > 1;
    this.hasNextPage = this.pageNumber < this.totalPages;
  }

  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
}
