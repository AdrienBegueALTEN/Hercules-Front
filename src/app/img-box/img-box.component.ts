import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Stores variables needed to handle the image
 */
@Component({
  selector: 'app-img-box',
  templateUrl: './img-box.component.html'
})
export class ImgBoxComponent {
  /**
   * True : User can delete an image
   * False : User cannot delete an image
   */
  @Input() public allowDelete : boolean = false;
  @Input() public src : string;
  /**
   * Defines the text displayed to the user when hovering the image
   */
  @Input() public title : string = 'Supprimer l\'image.';
  /**
   * Emitted event when user deletes an image
   */
  @Output() delete : EventEmitter<void> = new EventEmitter();
}
