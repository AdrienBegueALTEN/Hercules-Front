import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-logo-cust-input',
  templateUrl: './logo-cust-input.component.html',
  styleUrls: ['./logo-cust-input.component.scss']
})
export class LogoCustInputComponent implements OnInit {

  @Input() customer: any;
  @Output() customerChange = new EventEmitter<any>();
  logoCtrl = new FormControl();
  imgURL: any;
  public imagePath;
  public message: string;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event){
    /*let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.customer.logo = reader.result as ArrayBuffer;
        this.customerChange.emit(this.customer);
        
      };
    }*/
    let files = event.target.files;
    if(files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.customer.logo = this.imgURL;
      //this.customerChange.emit(this.customer);
    };
  }

}
