import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-logo-cust-input',
  templateUrl: './logo-cust-input.component.html',
  styleUrls: ['./logo-cust-input.component.scss']
})
export class LogoCustInputComponent implements OnInit {

  @Input() customer: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(private _customerService: CustomerService) { }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this._customerService.upload(this.currentFile, this.customer.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
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
