import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as sha1 from 'js-sha1';
/**
 * Manages project properties
 */
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent {
  /**
   * Project ID or customer ID
   */
  @Input() id : number;
  /**
   * Image title
   */
  @Input() title : string;
  /**
   * Image event emmitted containing the blob and the hashed name
   */
  @Output() image = new EventEmitter<any>();

  /**
   * Get the file from the HTML file picker, then a hashed name is created with the date of the day
   * and and id so that the name always change on upload.
   * Finally then tan event conataining both the blob of the file and the new name.
   * @param event 
   */
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

  /**
   * Simulates a click of an html file picker.
   */
  public openInput() : void { 
    document.getElementById("logoInput").click();
  }

}
