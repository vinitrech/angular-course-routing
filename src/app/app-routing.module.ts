import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ServersComponent} from "./servers/servers.component";
import {ServerComponent} from "./servers/server/server.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./users/user/user.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth-guard.service";
import {CanDeactivateGuard} from "./servers/edit-server/can-deactivate-guard.service";
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: "full"}, // pathMatch is used to indicate that it should be redirected ONLY if the path is '', with no other content after.
  {path: 'home', component: HomeComponent},
  {
    // path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [ <- canActivate will protect the route and its children
    path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [ // canActivateChild will only protect the children, not the parent route
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    // path: "not-found", component: PageNotFoundComponent
    path: "not-found", component: ErrorPageComponent, data: {message: "Page not found"}
  },
  {
    // path: "not-found", component: PageNotFoundComponent
    path: "error", component: ErrorPageComponent, data: {message: "Generic error"}
  },
  {
    path: "**", redirectTo: '/not-found' // this path should always be declared at the end
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
