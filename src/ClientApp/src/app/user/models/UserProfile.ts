import {UserAvatar} from "../../core/Models/UserAvatar";

export class UserProfile {
  constructor(public email: string, public avatar: UserAvatar) {
  }
}
