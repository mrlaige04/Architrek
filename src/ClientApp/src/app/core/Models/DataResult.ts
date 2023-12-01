import {ApiResult} from "./ApiResult";

export class DataResult<T> extends ApiResult {
  constructor(succeeded: boolean, errors: string[], public data: T) {
    super(succeeded, errors)
  }
}
