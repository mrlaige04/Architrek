import {ApiResult} from "./ApiResult";

export class DataResult<T> extends ApiResult {
  constructor(succeeded: boolean, status:number, errors: string[], public data: T) {
    super(succeeded, status, errors)
  }
}
