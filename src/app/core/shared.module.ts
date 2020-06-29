import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChildComponent } from '../shared-components/child/child.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      // MDBBootstrapModule.forRoot(),
      // NgbModule
    ],
    declarations: [ 
      ChildComponent
    ],
    providers: [DatePipe],
    exports: [
      FormsModule,
      ReactiveFormsModule,
      ChildComponent
    ]
    

 })
 export class SharedModule { }
