import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consultant-details',
  templateUrl: './consultant-details.component.html',
  styleUrls: ['./consultant-details.component.scss']
})
export class ConsultantDetailsComponent implements OnInit {

  consultant:any;
  consultantForm: FormGroup;

  constructor(private consultantService: ConsultantService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.params['id'];
    this.consultantService.getById(+id).subscribe(
      (data)=>{
        this.consultant=data;
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  initForm(){
    this.consultantForm = this.formBuilder.group({
      firstname:'',
      lastname:'',
      email:''
    });
  }

  /*onSubmit(){
    const formValue = this.consultantForm.value;
    const consultant={

    }
  }*/

}
