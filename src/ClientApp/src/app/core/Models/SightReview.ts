import {Guid} from "guid-typescript";
import {SightReviewPhoto} from "./SightReviewPhoto";

export class SightReview {
  constructor(public id: Guid, public rating: number, public posted: Date, public reviewText?: string, public reviewer?: string, public photos?: SightReviewPhoto[]) {
  }
}
