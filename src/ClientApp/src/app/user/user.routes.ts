import {Routes} from "@angular/router";
import {FavoriteSightsComponent} from "./profile/favorite-sights/favorite-sights.component";
import {MainInfoComponent} from "./profile/maininfo/main-info.component";
import {MyReviewsComponent} from "./profile/my-reviews/my-reviews.component";

export const userRoutes: Routes = [
  { path: 'favorite', component: FavoriteSightsComponent, data: {title: 'My favorites'} },
  { path: 'profile', component: MainInfoComponent, title: 'Profile'},
  { path: 'reviews', component: MyReviewsComponent, title: 'My reviews' },
  { path: '**', redirectTo: '/user/profile' }
]
