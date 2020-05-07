import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiplomaService } from 'src/app/_services/diploma.service';
import { Observable } from 'rxjs';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-consultant-new-diploma',
  templateUrl: './consultant-new-diploma.component.html',
  styleUrls: ['./consultant-new-diploma.component.scss']
})
export class ConsultantNewDiplomaComponent implements OnInit {
  @Input() consultantId:number;
  @Output() reload = new EventEmitter<any>();
  diplomaForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private diplomaService: DiplomaService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();

    
  }

  initForm(){
    this.diplomaForm = this.formBuilder.group({
      city: '',
      school: ['', Validators.required],
      year: ['', Validators.required],
      level: '',
      diploma: ['', Validators.required]
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
      ()=> {
        this.reload.emit();
        this.diplomaForm.reset();
      },
      (err) => {console.log(err);}
    );
  }

}
