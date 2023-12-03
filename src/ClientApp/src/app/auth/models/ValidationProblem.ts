export class ValidationProblem {
  constructor(public type: string, public title: string, public status: string, public errors: {}) {
  }
}
