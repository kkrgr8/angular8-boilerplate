import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,public router: Router,) { }

  ngOnInit() {
  }
  login(){  
    let user = {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
   }
    this.authService.login(user).pipe(first())
    .subscribe(
      response => {
        this.router.navigateByUrl('/customer');
      },
      error => {
          
      });
 } 

}
