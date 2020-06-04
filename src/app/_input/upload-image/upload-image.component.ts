import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent implements OnInit {

  @Input() id: number;
  @Input() btn: string;
  @Output() image = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectFile(event) {
    const date = new Date();
    let selectedFiles = event.target.files;
    let name = sha1(date.getFullYear()+date.getMonth()+date.getDate()+this.id);
    let extension = selectedFiles.item(0).name.split('.').pop(); 
    let renamedFile = new File([selectedFiles.item(0)],name+'.'+extension);
    this.image.emit(renamedFile);
  }

  openInput(){ 
    document.getElementById("logoInput").click();
  }

}
