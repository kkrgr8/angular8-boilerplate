import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { InterceptorService } from "./interceptor.service";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api_url = environment.url;
  

  constructor(private http: HttpClient , private interceptor: InterceptorService) {}


  public login(params) {
    let url = this.api_url+'/login';
    return this.interceptor.createData(url,params); 
  }

  public isLoggedIn(){
    return sessionStorage.getItem('CURRENT_USER') !== null;
  }

  public logout(){
    sessionStorage.clear();
    return true;
  }

  public getUsers(){    
    let url = this.api_url+'/agents';
    return this.interceptor.retrieveData(url); 
  }

  public getClients(){    
    let url = this.api_url+'/clients';
    return this.interceptor.retrieveData(url); 
  }

  public createUser(params){    
    let url = this.api_url+'/agents';
    return this.interceptor.createData(url,params); 
  }

  public createClients(params){    
    let url = this.api_url+'/clients';
    return this.interceptor.createData(url,params); 
  }

}