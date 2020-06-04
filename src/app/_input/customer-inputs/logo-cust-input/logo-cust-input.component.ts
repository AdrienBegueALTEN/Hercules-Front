import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-logo-cust-input',
  templateUrl: './logo-cust-input.component.html',
})
export class LogoCustInputComponent implements OnInit {

  @Input() customer: any;
  @Output() image = new EventEmitter<any>();
  selectedFiles: FileList;
  currentFile: File;
  currentFileRealName = 'Choisir un fichier en cliquant ici.';
  progress = 0;
  message = '';

  constructor(private _customerService: CustomerService) { }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileRealName = this.selectedFiles.item(0).name;
    let name = sha1(this.customer.name+this.customer.id+"logo");
    let extension = this.selectedFiles.item(0).name.split('.').pop(); 
    let renamedFile = new File([this.selectedFiles.item(0)],name+'.'+extension);
    this.image.emit({
      file:renamedFile,
      project:this.customer.id
  });
  }

  openInput(){ 
    document.getElementById("logoInput").click();
  }

}
