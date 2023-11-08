import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ToastersService {
  constructor(private toastr: ToastrService) {
  }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title)
  }
}
