import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public modalRef: BsModalRef;
  @ViewChild('modaltemplate',{static: false}) modaltemplate;

  constructor(public modalService: BsModalService) { }

  ngOnInit() {
  }
  openModel() {
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static'});
  } 
  closeModel(){
    this.modalRef.hide();
  }

}
