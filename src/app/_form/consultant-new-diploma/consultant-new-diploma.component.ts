import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiplomaService } from 'src/app/_services/diploma.service';

@Component({
  selector: 'app-consultant-new-diploma',
  templateUrl: './consultant-new-diploma.component.html',
  styleUrls: ['./consultant-new-diploma.component.scss']
})
export class ConsultantNewDiplomaComponent implements OnInit {
  @Input() consultant : number;

  readonly CITY_KEY : string = 'city';
  readonly ETABLISHMENT_KEY : string = 'establishment';
  readonly LEVEL_KEY : string = 'level';
  readonly NAME_KEY : string = 'name';
  readonly YEAR_KEY : string = 'year';
  grp : FormGroup;

  @Output() reload = new EventEmitter<any>();
  
  constructor(private formBuilder: FormBuilder,
    private _diplomaService: DiplomaService) { }

  ngOnInit() : void {
    this.grp = this.formBuilder.group({
      city: '',
      establishment: ['', Validators.required],
      level: '',
      name: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  onSubmit() : void {
    const diploma = {
      consultantId: this.consultant,
      graduationYear: this.grp.controls[this.YEAR_KEY].value,
      graduationCity: this.grp.controls[this.CITY_KEY].value,
      diplomaName: this.grp.controls[this.NAME_KEY].value,
      levelName: this.grp.controls[this.LEVEL_KEY].value,
      school: this.grp.controls[this.ETABLISHMENT_KEY].value
    }

    this._diplomaService.addDiploma(diploma).subscribe(
      ()=> { 
        this.reload.emit();
        this.ngOnInit()
      },
      err => { console.log(err); }
    );
  }
}
