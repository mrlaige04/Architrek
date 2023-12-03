import {Country} from "./Country";

export class Location {
  constructor(public longitude: number, public latitude: number, public country: Country) {
  }
}
