import {Property} from "./Property";
import {Guid} from "guid-typescript";

export class Category {
  constructor(public id: Guid, public name: string, public properties: Array<Property>) {
  }
}
