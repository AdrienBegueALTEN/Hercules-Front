import { Component, OnInit, Input } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.scss']
})
export class ConsultantFormComponent implements OnInit {

  @Input() consultant:any;
  consultantForm: FormGroup;

  constructor(private consultantService: ConsultantService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.consultantForm = this.formBuilder.group({
      firstname:'',
      lastname:'',
      email:'',
      diplomas: this.formBuilder.array([])
    });

    for(let d of this.consultant.diplomas){
      const newDiplomasControl = this.formBuilder.group({
        year:'',
        name:'',
        school:'',
        city:''
      });
      this.getDiplomas().push(newDiplomasControl);
    }
  }

  getDiplomas(): FormArray {
    return this.consultantForm.get('diplomas') as FormArray;
  }

  onAddHobby() {
    const diplomaGroup = this.formBuilder.group({
      year:'',
        name:'',
        school:'',
        city:''
    })
    this.getDiplomas().push(diplomaGroup);
  }

  /*onSubmit(){
    const formValue = this.consultantForm.value;
    const consultant={

    }
  }*/

}
