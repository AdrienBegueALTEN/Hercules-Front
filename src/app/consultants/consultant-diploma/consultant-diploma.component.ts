import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-consultant-diploma',
  templateUrl: './consultant-diploma.component.html',
  styleUrls: ['./consultant-diploma.component.scss']
})
export class ConsultantDiplomaComponent implements OnInit {

  @Input() diploma:any
  diplomaForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.diplomaForm = this.formBuilder.group({
      city: new FormControl(this.diploma.diplomaLocation.city),
      school: new FormControl(this.diploma.diplomaLocation.school),
      year: new FormControl(this.diploma.graduationYear),
      level: new FormControl(this.diploma.diplomaName.level.name),
      diploma: new FormControl(this.diploma.diplomaName.name)
    });
  }

  onSubmit(){
    const values = this.diplomaForm.value;
    console.log(values);
  }

}
