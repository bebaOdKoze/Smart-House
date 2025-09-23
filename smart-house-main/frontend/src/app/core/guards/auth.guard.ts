import { inject } from '@angular/core'; 
import { Router } from '@angular/router'; 

export const authGuard = () => {
    const router = inject(Router); 
    const isLoggedIn = !!localStorage.getItem('token'); 

    /*if(!isLoggedIn){
        router.navigate(['/login']); 
        return false; 
    }*/

    return true; 
}