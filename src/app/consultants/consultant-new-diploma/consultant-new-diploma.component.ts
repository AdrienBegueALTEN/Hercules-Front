import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DiplomaService } from 'src/app/_services/diploma.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultant-new-diploma',
  templateUrl: './consultant-new-diploma.component.html',
  styleUrls: ['./consultant-new-diploma.component.scss']
})
export class ConsultantNewDiplomaComponent implements OnInit {
  @Input() consultantId:number;
  diplomaForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private diplomaService: DiplomaService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();

    
  }

  initForm(){
    this.diplomaForm = this.formBuilder.group({
      city: new FormControl(),
      school: new FormControl(),
      year: new FormControl(),
      level: new FormControl(),
      diploma: new FormControl()
    });
  }

  onSubmit(){
    const values = this.diplomaForm.value;
    
    const dipl = {
      consultantId:this.consultantId,
      graduationYear:values.year,
      graduationCity:values.city,
      diplomaName:values.diploma,
      levelName:values.level,
      school:values.school
    }

    this.diplomaService.addDiploma(dipl).subscribe(
      ()=> {},
      (err) => {console.log(err);}
    );

    this.router.navigate(['/consultants/'+this.consultantId])
    
  }

}
