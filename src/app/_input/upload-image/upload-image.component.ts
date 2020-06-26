import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent {
  @Input() id : number;
  @Input() title : string;

  @Output() image = new EventEmitter<any>();

  public selectImg(event) : void {
    const date = new Date();
    let selectedFiles = event.target.files;
    if (!!selectedFiles) {
      let name = sha1(date.toISOString()+this.id);
      let extension = selectedFiles.item(0).name.split('.').pop(); 
      //let renamedFile = new File([selectedFiles.item(0)],name+'.'+extension);
      let blob =  new Blob([selectedFiles.item(0)], {type : 'image/jpeg'});
      this.image.emit({blob: blob, name: name+'.'+extension});
    }
  }

  public openInput() : void { 
    document.getElementById("logoInput").click();
  }

}
