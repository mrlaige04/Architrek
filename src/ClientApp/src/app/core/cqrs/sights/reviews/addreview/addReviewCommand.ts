import {Guid} from "guid-typescript";

export class AddReviewCommand {
  constructor(public sightId: Guid, public rating: number, public photos?: string[], public text?: string) {
  }
}
