import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCategoryFormComponent} from "../../category/create-category-form/create-category-form.component";
import {CreateSightFormComponent} from "../create-sight-form/create-sight-form.component";
import {CoreService} from "../../../../core/core.service";
import {Observable} from "rxjs";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Sight} from "../../../../core/Models/Sight";
import {Guid} from "guid-typescript";
import {AdminService} from "../../../admin.service";
import {Modal} from "flowbite";
import {modalOptions} from "../../category/category-list/category-list.component";
import {QRCodeModule} from "angularx-qrcode";

@Component({
  selector: 'app-sight-list',
  standalone: true,
  imports: [CommonModule, CreateCategoryFormComponent, CreateSightFormComponent, QRCodeModule],
  templateUrl: './sight-list.component.html',
  styleUrl: './sight-list.component.scss'
})
export class SightListComponent implements AfterViewInit {
  sights$: Observable<PaginatedList<Sight>>
  pageNumber= 1;
  pageSize = 10;

  currentQrCodeSightId?: Guid;

  @ViewChild('addSightModal') addSightModalElement?: ElementRef
  @ViewChild('qrCodeModal') qrCodeSightModalElement?: ElementRef;

  addSightModal = new Modal(null, modalOptions)
  qrCodeSightModal = new Modal(null, modalOptions)

  constructor(private core: CoreService, private admin: AdminService) {
    this.sights$ = core.getAllSights({pageNumber: this.pageNumber, pageSize: this.pageSize})
  }

  ngAfterViewInit() {
    this.addSightModal._targetEl = this.addSightModalElement?.nativeElement
    this.qrCodeSightModal._targetEl = this.qrCodeSightModalElement?.nativeElement
  }

  openEditModal() {
    this.addSightModal.show()
  }

  openQrCodeModal(id: Guid) {
    this.currentQrCodeSightId = id;
    this.qrCodeSightModal.show()
  }

  getQr(id?: Guid) {
    return window.origin + "/sight/" + id?.toString()
  }

  closeEditModal() {
    this.addSightModal.hide()
  }

  closeQrCodeModal() {
    this.qrCodeSightModal.hide()
  }

  getSights() {
    this.sights$ = this.core.getAllSights({pageNumber: this.pageNumber, pageSize: this.pageSize})
  }

  nextPage() {
    this.pageNumber++;
    this.getSights()
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getSights()
    }
  }

  deleteSight(id: Guid) {
    this.admin.deleteSight(id).subscribe(res => {
      if (res.succeeded) {
        this.getSights()
      }
    })
  }
}
