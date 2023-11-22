import {CreateCategoryProperty} from "./CreatCategoryProperty";

export class CreateCategoryCommand {
  constructor(public name: string, public properties: Array<CreateCategoryProperty>) {
  }
}
