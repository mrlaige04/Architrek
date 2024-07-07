import {Routes} from "@angular/router";
import {StartPageComponent} from "./start-page/start-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {ReportComponent} from "../Shared/report/report.component";
import {SightDetailComponent} from "./sight-detail/sight-detail.component";
import {_404Component} from "../Shared/404/404.component";

export const coreRoutes: Routes = [
  {  path: '', component: StartPageComponent },
  {  path: 'search', component: SearchPageComponent, title: 'Search' },
  {  path: 'report', component: ReportComponent },
  {  path: 'sight/:id', component: SightDetailComponent, title: 'Sight' },
  {  path: '**', component: _404Component, title: 'Page not found'}
];
