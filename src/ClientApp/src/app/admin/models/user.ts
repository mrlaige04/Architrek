import {Guid} from "guid-typescript";

export class User {
  constructor(public id: Guid, public email: string, public userName: string) {
  }
}
