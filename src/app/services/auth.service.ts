import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { InterceptorService } from "./interceptor.service";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api_url = environment.url;
  public headers = new HttpHeaders({'Content-Type': 'application/json'});
  public httpOptions = { headers: this.headers };


  constructor(private http: HttpClient , private interceptor: InterceptorService) {}


  public login(params) {
    let param = {
      "user" : params
    }

    let url = 'https://reqres.in/api/login';
    return this.interceptor.createData(url,params); 
    //let url = 'http://renshiners.freshcare.com:3000/users/sign_in';
    //return this.interceptor.createData(url,param); 
  }
  public getUsers(){    
    let url = this.api_url+'/api/users?page=2';
    return this.interceptor.retrieveData(url); 
  }

}