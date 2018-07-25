import { Router } from '@angular/router';

export class CError {
    constructor(  private router:Router ){}

    Auth(error: any) {
        if(error.status === 500) {
            localStorage.setItem('token', null);
            this.router.navigate(['/auth']);
        }
    }
}