import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.less']
})
export class ClientsComponent implements OnInit {
  public users : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;
  public modalRef: BsModalRef;
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  constructor(public modalService: BsModalService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private toastr: ToastrService,private authService: AuthService) { }
  get formControls() { return this.userForm.controls; }
  ngOnInit() {
    this.userForm  =  this.formBuilder.group({
          title: ['', Validators.required],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          user_name: ['', Validators.required],
          postcode: ['', Validators.required],
          email: ['', Validators.required],
          mobile: ['', Validators.required],
          role: ['', Validators.required],
          landline: ['', Validators.required],
          region: ['', Validators.required],
          gender: ['', Validators.required],
          dateOfBirth: ['', Validators.required]
        });
    this.getUsers();
  }
  getUsers(){  
   this.spinner.show();
    this.authService.getUsers().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.users = response.agents;
        console.log(this.users );
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }
 openModel() {
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});

  } 
  closeModel(){
    this.modalRef.hide();
  }

  createUser(){

    this.isSubmitted = true;
    this.isDisabled = true;
    console.log(this.userForm);
    if(this.userForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();

    let user = {
        "title": this.userForm.value.title,
        "first_name": this.userForm.value.first_name,
        "last_name": this.userForm.value.last_name,
        "email": this.userForm.value.email,
        "address": this.userForm.value.address,
        "mobile": this.userForm.value.mobile,
        "postcode": this.userForm.value.postcode,
        "dob": this.userForm.value.dob,
        "region_ids": [
            this.userForm.value.region
        ],
        "gender": this.userForm.value.gender,
        "role_ids": [this.userForm.value.role]
    };
    console.log(user);
    this.authService.createClients(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.getUsers();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
