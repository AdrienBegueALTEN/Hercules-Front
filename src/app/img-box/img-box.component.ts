import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-img-box',
  templateUrl: './img-box.component.html'
})
export class ImgBoxComponent {
  @Input() public allowDelete : boolean = false;
  @Input() public src : string;
  @Input() public title : string = 'Supprimer l\'image.';
  public isImgHover : boolean = false;
  @Output() delete : EventEmitter<void> = new EventEmitter();
}
