export class ApiResult {
  constructor(public succeeded: boolean, public status: number, public errors: string[]) {
  }
}
