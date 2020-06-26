import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultantService } from '../../_services/consultant.service';
import { isUndefined } from 'util';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { Router } from '@angular/router';

/**
 * Handles consultants data
 */
@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConsultantsComponent implements OnInit {
  /**
   * True : User is manager
   * False : User isn't manager
   */
  readonly userIsManager : boolean = this._authService.userIsManager();
  /**
   * True : Only shows consultants linked with the logged in user
   * False : Shows every consultant
   */
  public onlyMine : boolean = this.userIsManager;
  /**
   * Consultants array
   * Contains every consultant
   */
  private consultants: any[];
  /**
   * Gets user ID
   */
  private _loggedUserId = this._authService.getUser().id;
    /**
   * Data source containing every consultant, but formatted to make the array usable in customer table
   */
  public dataSource: MatTableDataSource<any>;
  /**
 * Columns used to display consultants
 */
  public columnsToDisplay : string[] = ['firstname', 'lastname', 'email', 'releaseDate', 'userActions'];

  /**
   * Consultant key
   */
  readonly LABEL : string = "consultant";
  /**
   * Defines the manager column index
   */
  readonly MANAGER_COLUMN_INDEX : number = 3;

  constructor(
    private _authService : AuthService,
    private _consultantService : ConsultantService,
    private _dialogUtils : DialogUtilsService,
    private _router : Router
  ) {}

  public ngOnInit() : void {
    this._consultantService.getConsultants(false).subscribe(
      (consultants) => {
        this.consultants = consultants;
        this.refreshDatasource();
      },
      () => window.location.replace('')
    )
  }

  /**
   * Refreshed the data source
   * When onlyMine is true, all consultants displayed are linked to the manager
   */
  public refreshDatasource() : void {
    this.dataSource = this.onlyMine ?
      this.dataSource = new MatTableDataSource(this.consultants.filter((cons) => cons.manager.id == this._loggedUserId)) :
      this.dataSource = new MatTableDataSource(this.consultants);
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  /**
   * Surch in sub-object
   * @param search 
   * @param data 
   * @param key 
   */
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  /**
   * 
   * @param event Even is triggered when the user types anything inside the search bar
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onOnlyMine() : void {
    this.onlyMine = !this.onlyMine;
    if (this.onlyMine) {
      const managerColumnIndex = this.columnsToDisplay.findIndex(column => column === 'manager')
      this.columnsToDisplay.splice(managerColumnIndex, 1);
    } else this.columnsToDisplay.splice(this.MANAGER_COLUMN_INDEX, 0, 'manager')
    this.refreshDatasource();
  }

  public onDeactivate(event : any) : void {
    this._consultantService.updateConsultant(event.user, 'releaseDate', event.releaseDate).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible de notifier la sortie des effectifs.")
    );
  }

  /**
   * Creates a new consultant
   * If he can't be created, returns an error message to the user
   */
  public newConsultant() : void {
    this._dialogUtils.showNewUserDialog(this.LABEL).afterClosed().subscribe(
      (user : any) => {
        if (isUndefined(user)) return;
        this._consultantService.newConsultant(user.email, user.firstname, user.lastname, this._loggedUserId).subscribe(
          (response) => {this._handleAddResponse(response); this.ngOnInit();},
          (error) => this._handleAddResponse(error)
        )
      }
    )
  }

  public goToConsultantPage(consultant : number) {
    this._router.navigateByUrl('consultants/' + consultant);
  }

  /**
   * Handles creation error
   * Checks the API response when a consultant is created
   * @param response Type of response sent by the API
   */
  private _handleAddResponse(response : Response) {
    if (response.status !== HttpStatus.CREATED) {
      let message : string = "Impossible d'ajouter ce " + this.LABEL + ".";
      if (response.status === HttpStatus.ACCEPTED)
        message = message.concat(" L'adresse email renseignée est indisponible.");
      this._dialogUtils.showMsgDialog(message);
    } else this.ngOnInit();
  }
}

