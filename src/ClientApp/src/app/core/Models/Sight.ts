import {Location} from "./Location";
import {Category} from "./category";
import {SightPhoto} from "./SightPhoto";
import {SightReview} from "./SightReview";
import {Tag} from "./Tag";
import {Guid} from "guid-typescript";
import {Information} from "./Information";

export interface Sight {
  id: Guid;
  name: string;
  description: string;
  location: Location;
  category: Category;
  sightPhotos: SightPhoto[];
  information: Information[];
  tags: Tag[];
  reviews: SightReview[];
}
