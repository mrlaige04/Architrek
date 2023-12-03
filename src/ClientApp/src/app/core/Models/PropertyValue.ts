import {Property} from "./Property";

export class PropertyValue {
  constructor(public property: Property, public jsonValue: string) {
  }
}
