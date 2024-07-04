import {Component, Injector, OnInit, runInInjectionContext, Signal, signal} from '@angular/core';
import {CoreService} from "../core.service";
import {map, Observable, tap} from "rxjs";
import {PaginatedList} from "../Models/PaginatedList";
import {Sight} from "../Models/Sight";
import {Category} from "../Models/category";
import {Guid} from "guid-typescript";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {ToastersService} from "../../services/ToastersService";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public selectedCategory: Guid | undefined = undefined;
  public categories: Observable<PaginatedList<Category>>;

  public sights$!: Signal<Sight[] | undefined>;

  public query?: string;

  public pageNumber = signal(1);
  public pageSize = signal(10);
  public totalCount = signal(0)
  public totalPages = signal(0)

  findNearForm: FormGroup;

  constructor(
    private coreService: CoreService,
    fb: FormBuilder,
    private injector: Injector,
    private toastr: ToastersService)
  {
    this.categories = coreService.getAllCategories()
    this.sights$ = toSignal(this.getSights())

    this.findNearForm = fb.group({
      radius: new FormControl(0, [Validators.required, RxwebValidators.numeric()]),
    })
  }

  ngOnInit() {
    this.sights$ = toSignal(this.getSights())
  }

  private getSights() {
    return this.coreService.getAllSights({
      pageSize: this.pageSize(),
      pageNumber: this.pageNumber()
    }).pipe(
      tap(list => {
        this.totalPages.set(list.totalPages)
        this.totalCount.set(list.totalCount)
      }),
      map(list => list.items)
    )
  }


  searchSubmit() {

    runInInjectionContext(this.injector, () => {
      this.sights$ = toSignal(
        this.coreService.searchSights({
          pageSize: this.pageSize(),
          pageNumber: this.pageNumber(),
          categoryId: this.selectedCategory,
          query: this.query ?? ''
        })
          .pipe(
            tap(list => {
              this.totalPages.set(list.totalPages)
              this.totalCount.set(list.totalCount)
            }),
            map(list => list.items)
          ), {
          rejectErrors: true
        }
      )
    })
  }

  prevPage() {
    runInInjectionContext(this.injector, () => {
      this.pageNumber.update(pn => pn - 1);
      this.sights$ = toSignal(this.getSights())
    })
  }

  exactPage(page: number) {
    runInInjectionContext(this.injector, () => {
      this.pageNumber.set(page + 1);
      this.sights$ = toSignal(this.getSights())
    })
  }

  nextPage() {
    runInInjectionContext(this.injector, () => {
      this.pageNumber.update(pn => pn + 1);
      this.sights$ = toSignal(this.getSights())
    })
  }

  findNear() {
    if (this.findNearForm.valid) {
      const radius = this.findNearForm.value['radius']
      navigator.geolocation.getCurrentPosition(pos => {
        const geo = pos.coords;
        this.sights$ = toSignal(
          this.coreService.getNearSights({radius, longitude: geo.longitude, latitude: geo.latitude},
          this.pageNumber(), this.pageSize())
            .pipe(
              tap(list => {
                this.totalPages.set(list.totalPages)
                this.totalCount.set(list.totalCount)
              }),
              map(list => list.items)
            )
        )
      }, _ => {
        this.toastr.showError('We cant find near sights, because you haven\'t allowed geolocation')
      })
    }
  }

  protected readonly Array = Array;
  protected readonly undefined = undefined;
}

export type FindNearQuery = {
  radius: number,
  latitude: number,
  longitude: number
}
