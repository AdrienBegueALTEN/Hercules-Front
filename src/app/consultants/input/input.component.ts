import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() typeInput:string;
  @Input() consultantId:number;
  @Input() title:string;
  @Input() currentVal: string;
  @Input() fieldName: string;

  ctrl:FormControl;

  constructor(private router: Router,
    private consultantService: ConsultantService) { }

  ngOnInit(): void {
    this.ctrl = new FormControl(this.currentVal);
  }

  update(){
    let value = this.ctrl.value;
    if(this.typeInput=='number')
      value = +value
    const json = {
      id: this.consultantId,
      fieldName: this.fieldName,
      value: value
    };
    this.consultantService.updateConsultant(json).subscribe(
      ()=>{},
      (err)=>{console.log(err);}
    );
    this.router.navigateByUrl('/consultants/'+this.consultantId);
  }

}
