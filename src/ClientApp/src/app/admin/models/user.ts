import {Guid} from "guid-typescript";
import {UserAvatar} from "../../core/Models/UserAvatar";

export class User {
  constructor(public id: Guid, public email: string, public userName: string, public avatar: UserAvatar) {
  }
}
