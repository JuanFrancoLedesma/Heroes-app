import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, CanMatchFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {
  
  constructor(private authService: AuthService, private router: Router){}

  private isLogin(){
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated)=>{
        if(isAuthenticated) this.router.navigate(['/heroes/list'])
      }),
      map((isAuthenticated) => !isAuthenticated)
    )
  }

  canMatch(): boolean | Observable<boolean>{
    return this.isLogin()
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isLogin()
  }
}