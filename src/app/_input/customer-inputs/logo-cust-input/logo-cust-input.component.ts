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
  src;
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.customer.logo = reader.result as ArrayBuffer;
        this.customerChange.emit(this.customer);
        
      };
    }
  }

}
