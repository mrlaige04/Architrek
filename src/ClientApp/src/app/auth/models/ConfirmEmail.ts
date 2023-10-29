import {Guid} from "guid-typescript";

export class ConfirmEmail {
  constructor(public userId: Guid, public code: string) {
  }
}
