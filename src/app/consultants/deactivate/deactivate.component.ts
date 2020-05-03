import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss']
})
export class DeactivateComponent implements OnInit {
  releaseForm: FormGroup;

  constructor(private _bottomSheetRef: MatBottomSheetRef<DeactivateComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private consultantService: ConsultantService,
    private router: Router) {}

    ngOnInit(): void {
      this.initForm();
    }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  initForm(){
    this.releaseForm = this.formBuilder.group({
      releaseDate: new FormControl(new Date().toISOString().substr(0, 10)),
    });
  }

  onSubmit(){
    const values = this.releaseForm.value;

    const json = {
      id: this.data.consultant.id,
      fieldName: 'releaseDate',
      value: values.releaseDate
    };

    /*const json = {
      id: this.data.consultant.id,
      releaseDate: new Date(values.releaseDate)
    };*/

    this.consultantService.updateConsultant(json).subscribe(
      ()=>{},
      (err) => {console.log(err)}
    )
    this.router.navigateByUrl('/consultants/'+this.data.consultant.id);
  }

}
