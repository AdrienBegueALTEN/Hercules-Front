import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-logo-cust-input',
  templateUrl: './logo-cust-input.component.html',
  styleUrls: ['./logo-cust-input.component.scss']
})
export class LogoCustInputComponent implements OnInit {

  @Input() customer: any;
  @Output() reload = new EventEmitter<any>();
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
  }

  upload() {
    this.progress = 0;
    let name = sha1(this.customer.name+"logo");
    let extension = this.selectedFiles.item(0).name.split('.').pop(); 
    let renamedFile = new File([this.selectedFiles.item(0)],name+'.'+extension);
    this.currentFile = renamedFile;
    this._customerService.upload(this.currentFile, this.customer.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if(event.status==200){
            this.message = "Le fichier est chargé.";
            this.reload.emit(name+'.'+extension);
          }
          else
            this.message  ="Une erreur est survenu ("+event.status+").";
          this.progress = 0;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }

  

}
