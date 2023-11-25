import {Location} from "./Location";
import {Category} from "./category";
import {SightPhoto} from "./SightPhoto";
import {SightReview} from "./SightReview";
import {PropertyValue} from "./PropertyValue";
import {Tag} from "./Tag";
import {Guid} from "guid-typescript";
import {Information} from "./Information";

export class Sight {
  constructor(public id: Guid,
              public name: string,
              public description: string,
              public location: Location,
              public category: Category,
              public sightPhotos: Array<SightPhoto>,
              public propertyValues: Array<PropertyValue>,
              public information: Array<Information>,
              public tags: Array<Tag>,
              public reviews: Array<SightReview>,) {
  }
}
