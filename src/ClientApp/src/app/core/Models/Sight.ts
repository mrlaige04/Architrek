import {Location} from "./Location";
import {Category} from "./category";
import {SightPhoto} from "./SightPhoto";
import {SightReview} from "./SightReview";
import {PropertyValue} from "./PropertyValue";
import {Tag} from "./Tag";
import {Guid} from "guid-typescript";

export class Sight {
  constructor(public id: Guid,
              public name: string,
              public description: string,
              public location: Location,
              public category: Category,
              public sightPhotos: Array<SightPhoto>,
              public reviews: Array<SightReview>,
              public propertyValues: Array<PropertyValue>,
              public tags: Array<Tag>) {
  }
}
