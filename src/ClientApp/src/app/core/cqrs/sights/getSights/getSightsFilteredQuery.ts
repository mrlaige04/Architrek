import {Guid} from "guid-typescript";

export class GetSightsFilteredQuery {
  constructor(public pageNumber: number,
              public pageSize: number,
              public query?: string,
              public categoryId?: Guid) {
  }
}
