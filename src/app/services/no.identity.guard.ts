import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()

export class NoIdentityGuard implements CanActivate{
    constructor(
        private router: Router,
        private userService: UserService
    ){}

    canActivate()
    {
        let identity = this.userService.getIdentity();

        if(identity && identity.name)
        {
            this.router.navigate(['/admin/listrooms']);
            return false;
           
        }
        else
        {
            return true;
        }
    }
}