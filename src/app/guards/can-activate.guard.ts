import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.user.roleId;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.user) {
      if (route.data.roles.includes(0)) {
        return true;
      } else if (
        route.data.roles.findIndex(
          (x) => x === this.authService.user.roleId
        ) !== -1
      ) {
        return true;
      } else {
        this.router.navigate(["/no-access"]);
      }
    } else {
      this.router.navigate([""]);
    }
  }
}
