import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from  '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;

  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,private formBuilder: FormBuilder,private authService: AuthService,public router: Router,) { }
 
  get formControls() { return this.loginForm.controls; }

  ngOnInit() {
 
        this.loginForm  =  this.formBuilder.group({
          user_name:  ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          remember_me : false
        });
 
  }
  login(){  
    this.isSubmitted = true;
    this.isDisabled = true;
    if(this.loginForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();
    let user = {
      email : this.loginForm.value.user_name.toLowerCase(),
      password : this.loginForm.value.password,
    };
    this.authService.login(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('Logged in successfully');
        //sessionStorage.setItem('token', JSON.stringify(response.token)); 
        sessionStorage.setItem('token', JSON.stringify('d03d1331791ec3630a991tttt'))

        if(this.loginForm.value.remember_me == true){  
          localStorage.setItem('remember_me', 'true');
          localStorage.setItem('user_name', this.loginForm.value.user_name);
          localStorage.setItem('password', this.loginForm.value.password);
        }else{
          localStorage.setItem('remember_me', 'false');
          localStorage.removeItem('user_name');
          localStorage.removeItem('password');  
        }        
        this.router.navigateByUrl('/customer');
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
