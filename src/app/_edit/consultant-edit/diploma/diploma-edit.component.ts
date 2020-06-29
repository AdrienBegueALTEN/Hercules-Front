import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Component for the parts that serve to modify a diploma
 */
@Component({
  selector: 'app-diploma-edit',
  templateUrl: './diploma-edit.component.html'
})
export class ConsultantDiplomaComponent implements OnInit {
  /**
   * ID of the consultant
   */
  @Input() consultant : number;
  /**
   * Object diploma with the information
   */
  @Input() diploma : any;
  /**
   * Boolean that indicates if the diploma is new
   */
  @Input() new : boolean;

  readonly ESTABLISHMENT_KEY : string = 'establishment';
  readonly ENTITLED_KEY : string = 'entitled';
  readonly ID_KEY : string = 'id';
  readonly LEVEL_KEY : string = 'level';
  readonly YEAR_KEY : string = 'year';

  /**
   * Form for a diploma
   */
  public grp : FormGroup;

  /**
   * List of already known cities of diploma filtered by the given letters
   */
  filteredDiplomasCity: Observable<any[]>;
  /**
   * List of already known schools of diploma filtered by the given letters
   */
  filteredDiplomasSchool: Observable<any[]>;


  @Output() deletion = new EventEmitter<number>();
  @Output() reload = new EventEmitter<any>();
  
  constructor(
    private _consultantService : ConsultantService,
    private _dialogUtils : DialogUtilsService
  ) {}

  public ngOnInit() : void {
    const maxYear : number = new Date().getFullYear();
    const minYear : number = maxYear - 90;
    this.grp = new FormBuilder().group({
      establishment: [this.diploma?.establishment, [Validators.required]],
      entitled: [this.diploma?.entitled, [Validators.required]],
      level: [this.diploma?.level, [Validators.required]],
      year: [this.diploma?.year, [Validators.required, Validators.min(minYear), Validators.max(maxYear)]]
    });
  }

  /**
   * Function activated when a field for the diploma is updated and it sends an http request to update the database
   * @param key name of the updated field
   */
  public onChange(key : string) : void {
    if (!this._doUpdate(key)) return;

    const newValue : any = (key === this.YEAR_KEY) ? 
    Number(this.grp.controls[key].value) : this.grp.controls[key].value;
    this._consultantService.updateDiploma(this.diploma[this.ID_KEY], key, newValue)
    .subscribe(
      () => this.diploma[key] = newValue,
      err => console.log(err)
    );
  }

  /**
   * Function that indicates if an update has been made in a field
   * @param key name of the field
   */
  private _doUpdate(key : string) {
    return !this.new && this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  /**
   * Function activated when a new diploma is created and it sends an http request to add it in the database
   */
  public onCreate() : void {
    this._consultantService.addDiploma(
      this.consultant,
      this.grp.controls[this.ESTABLISHMENT_KEY].value,
      this.grp.controls[this.ENTITLED_KEY].value,
      this.grp.controls[this.LEVEL_KEY].value,
      Number(this.grp.controls[this.YEAR_KEY].value))
    .subscribe(
      ()=> { 
        this.reload.emit();
      },
      err => { console.log(err); }
    );
  }

  /**
   * Function activated when a diploma is deleted and it sends an http request to remove it in the database
   */
  public onDelete() : void {
    this._dialogUtils.showYesNoDialog(
      'Validation de suppression',
      'Attention, cette action est irréversible.',
      'Supprimer le diplôme',
      'Annuler').afterClosed().subscribe(yes => {
        if (yes) this._removeDiploma(this.consultant, this.diploma[this.ID_KEY]);
      }
    );
  }

  /**
   * Function that sends an http request to remove a diploma of a consultant from the database
   * @param consultant ID of the consultant
   * @param diploma ID of the diploma
   */
  private _removeDiploma(consultant : number, diploma : number) {
    this._consultantService.removeDiploma(consultant, diploma).subscribe(
      () => this.deletion.emit(this.diploma[this.ID_KEY]),
      error => console.log(error)
    )
  }
}