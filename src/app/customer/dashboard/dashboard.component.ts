import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public modalRef: BsModalRef;
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  @ViewChild('modaltemplate2',{static: false}) modaltemplate2;

  constructor(public modalService: BsModalService) { }

  ngOnInit() {
  }
  openModel() {
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});

  }

  openModel2() {
    this.modalRef = this.modalService.show(this.modaltemplate2,{backdrop : 'static',class:'modal-right'});

  } 
  closeModel(){
    this.modalRef.hide();
  }

closeModel2(){
    this.modalRef.hide();
  }
}
