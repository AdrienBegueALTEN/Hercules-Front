import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { DiplomaService } from 'src/app/_services/diploma.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-consultant-diploma',
  templateUrl: './consultant-diploma.component.html',
  styleUrls: ['./consultant-diploma.component.scss']
})
export class ConsultantDiplomaComponent implements OnInit {

  @Input() diploma:any;
  @Input() consultantId:number;
  @Output() reload = new EventEmitter<any>();
  diplomaForm: FormGroup;
  diplomas : any[];

  filteredDiplomasCity: Observable<any[]>;
  filteredDiplomasSchool: Observable<any[]>;
  
  constructor(private formBuilder: FormBuilder,
    private diplomaService: DiplomaService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.diplomaService.getAll().subscribe(
      (data) => {
        this.diplomas = data;

        this.filteredDiplomasCity = this.diplomaForm.controls['city'].valueChanges.pipe(
          startWith(''),
          map(diploma => diploma? this._filterCity(diploma) : this.diplomas.slice())
        );

        this.filteredDiplomasSchool = this.diplomaForm.controls['school'].valueChanges.pipe(
          startWith(''),
          map(diploma => diploma? this._filterSchool(diploma) : this.diplomas.slice())
        );
      },
      (err) => {
        console.log(err);
      }
    );

    
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.diplomas.filter(d => d.diplomaLocation.city.toLowerCase().includes(filterValue));
  }
  private _filterSchool(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.diplomas.filter(d => d.diplomaLocation.school.toLowerCase().includes(filterValue));
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
    
    const dipl = {
      id:this.diploma.id,
      graduationYear:[values.year, Validators.required],
      graduationCity:values.city,
      diplomaName:[values.diploma, Validators.required],
      levelName:values.level,
      school:[values.school, Validators.required]
    }

    this.diplomaService.updateDiploma(dipl).subscribe(
      ()=>{},
      (err) => {
        console.log(err);
      }
    )

    //this.router.navigateByUrl('/consultants/'+this.consultantId);
  }

  onDelete(){
    const req={
      consultantId: this.consultantId,
      diplomaId: this.diploma.id
    }
    this.diplomaService.deleteDiploma(req).subscribe(
      ()=>{
        this.reload.emit();
      },
      (err) => {
        console.log(err);
      }
    )
    
  }

}
