import { SheetStatus } from 'src/app/_enums/sheet-status.enum';
import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from 'src/app/_services/mission.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MissionColumnChoiceComponent } from 'src/app/_dialog/mission-column-choice/mission-column-choice.component';
import * as FileSaver from 'file-saver';
import { ChooseFilenameDialogComponent } from 'src/app/_dialog/choose-filename-dialog/choose-filename-dialog.component';

/**
 * Fetches all missions and displays the contents to the user with a table
 */
@Component({
  selector: 'app-array-missions-view',
  templateUrl: './array-missions-view.component.html',
  styleUrls: ['./array-missions-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArrayMissionsViewComponent implements OnInit, AfterViewInit {


  /**
 * Get all missions from the child component
 */
  @Input() missions : any[];

  /**
 * Get the value of the integer from 
 */
  @Input() showOnlyMineToogle : boolean = false;

  /**
 * Columns used to display missions
 */
  @Input() displayedColumns : string[] = ['select', 'title', 'consultant', 'customer', 'city', 'manager', 'numberOfProjects', 'sheetStatus'];

  /**
 * Integer limiting the number of selected elements
 */
  readonly NB_MAX_CHECK : number = 30;

   /**
 * Emits the delete event to the child component
 */
  @Output() deleteEvent = new EventEmitter<any>();

  /**
 * If true, only displays missions belonging to the connected user
 * If false, displays every single mission
 */
  onlyMine = true;

  /**
 * Contains missions fetched from child component
 */
  dataSource: MatTableDataSource<any>;

  /**
 * Contains projects fetched from child component
 */
  dataSourceProjects: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  /**
 * Contains the input value entered by the user when he uses basic search
 */
  searchValue:string = null;

  public user : any = this._authService.getUser();

  /**
 * If true, the user is manager
 * If false, the user is a recruitment officer
 */
  public userIsManager : boolean = this._authService.userIsManager();

  /**
 * Columns used to display projects
 */
  innerDisplayedColumns: string[] = ['select', 'project-name', 'project-description'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(MatInput) matInputs: QueryList<MatInput>;

  /**
 * Uses the cdkdetailrow directive, allowing to expand missions to displays projects
 */
  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(
    private _authService: AuthService,
    private _missionService: MissionService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshDatasource();
  }

  ngAfterViewInit(){
    this.refreshDatasource();
  }


  /**
 * Changes the value of the datasource with a new missions array
 * @param missions New missions array
 */
  public modifyArray(missions: any[]){
    this.missions = missions;
    this.refreshDatasource();
  }

  public refreshDatasource(revert : boolean = false) {
    this.selection.clear()
    let data = this.missions;
    if (this.userIsManager && this.showOnlyMineToogle && (revert ? !this.onlyMine : this.onlyMine)) {
      data = data.filter((mission) => mission.consultant.manager.id === this.user.id);
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'title': return item.lastVersion.title;
        case 'consultant': return item.consultant.firstname;
        case 'customer': return item.customer.name;
        case 'city': return item.lastVersion.city;
        case 'manager': return item.consultant.manager.firstname;
        case 'sheetStatus': return item.sheetStatus;
        case 'numberOfProjects': return item.lastVersion.projects?.length;
        default: return item[property];
      }

    };

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const keywords : string[] = filter.split(" ");
      var matches : boolean = true;
      keywords.forEach(keyword => matches = matches && dataStr.indexOf(keyword.toLowerCase()) !== -1)
      return matches;
    };

  }

   /**
 * Searches for any missions that matches the input string
 * 
 * @param search The input string entered by the user
 * @param data The data that needs to be searched
 * @param key Algorithm needs it to return the informations that match the search string
 */
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else search += data[key];
    return search;
  }

  /**
 * Apply a filter for simple search
 * 
 * @param event This event is triggered when the user types anything inside the basic search bar 
 */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


   /**
 * 
 * Computes the number of validated missions
 * @returns Number of validated missions inside the missions array
 */
  public getNbCheckableRow() : number {
    const checkableMission : any[] = this.dataSource.data.filter(row => row.sheetStatus === SheetStatus.VALIDATED);
    var nbCheckableRow : number = 0;
    checkableMission.forEach(mission => nbCheckableRow += mission.lastVersion.projects.length + 1);
    return nbCheckableRow;
  }


  /**
 * Toggle every validated mission
 */
  public masterToggle() : void {
    if (this.selection.selected.length === this.getNbCheckableRow())
      this.selection.clear();
    else {
      var row : number = 0, subRow : number, nbProjects : number;
      while (row < this.dataSource.data.length && this.selection.selected.length < this.NB_MAX_CHECK) {
        if (this.dataSource.data[row].sheetStatus === SheetStatus.VALIDATED) {
          subRow = 0;
          nbProjects = this.dataSource.data[row].lastVersion.projects.length;
          this.selection.select(this.dataSource.data[row]);
          while (subRow < nbProjects && this.selection.selected.length < this.NB_MAX_CHECK) {
            this.selection.select(this.dataSource.data[row].lastVersion.projects[subRow]);
            subRow++;
          };
        }
        row++;
      };
    }
  }

  
generatePDF(selectedElements : any[],filename : string) : void {
    if (filename.search(".pdf") == -1)
      filename = filename + ".pdf";

    let elements : any[] = [];
    selectedElements.forEach( function (value){
      if(!!value.customer){
        elements.push({
          id : value.id,
          customer : value.customer.id,
          consultant : value.consultant.id,
          type : "m"
        });
      }
      else{
        elements.push({
          id : value.id,
          type : "p"
        });
      }
    });
    this._missionService.generatePDF(elements).subscribe(
      (content) => {  
                        
                        this._snackBar.open("Le PDF a bien été enregistré",'X', { duration: 2000 });
                        var newBlob = new Blob([content], { type: "application/pdf" });
                        
                        try{
                          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(newBlob, filename);}
                          else{
                            FileSaver.saveAs(newBlob, filename);
                          }
                        } catch(error){
                          const dialogConfig = new MatDialogConfig();
                          dialogConfig.data = "Le fichier PDF n'a pas pu être enregistré.";
                          this._dialog.open(MessageDialogComponent,dialogConfig);
                        }
                  },
      (error) => {  if(error.error==="the file could not be saved"){
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = "Le fichier PDF n'a pas pu être finalisé sur le serveur.";
                      this._dialog.open(MessageDialogComponent,dialogConfig); 
                    }
                    else{
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = "Le fichier PDF n'a pas pu être crée sur le serveur.";
                      this._dialog.open(MessageDialogComponent,dialogConfig);
                    }

      }
    );


  }

   /**
 * 
 * Allows an element to be clicked if the number of selected elements doesn't exceed the value of NB_MAX_CHECK
 * @param event Prevents the checkbox from being clicked if it doesn't match all conditions
 * @param row Checks if a checkbox isn't already checked
 */
  onClick(event, row) {
    if (this.selection.selected.length >= this.NB_MAX_CHECK && !(this.selection.isSelected(row))) {
      event.preventDefault();
      this._snackBar.open(
        'Vous avez dépassé le nombre d\'éléments sélectionnés autorisé : ' + this.NB_MAX_CHECK,
        'X',
        { duration: 2000 });
    }
  }

  /**
 * 
 * Displays a snack bar message to the user when the number of selected elements exceed the value of NB_MAX_CHECK
 */
  SnackBarMessage() {
    if (this.selection.selected.length >= this.NB_MAX_CHECK) {
      this._snackBar.open('Vous avez dépassé le nombre d\'éléments sélectionnés autorisé : ' + this.NB_MAX_CHECK, 'X', { duration: 2000 });
    }
  }

  onClickProjects(event) {
    event.preventDefault();
  }

  /**
 * 
 * Allows the user to select the displayed columns he wants
 */
  openColsChoice(){
    const dialogRef = this._dialog.open(MissionColumnChoiceComponent, {
      data: {
        cols:this.displayedColumns
      }
    });
    dialogRef.componentInstance.colsEvent.subscribe(
      (data: any[])=>{
        this.displayedColumns = data;
      }
    )
  }

  onChooseFilenameDialog(selectedElements : any[]){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { filename :"fichesMissionsEtProjets.pdf"};
    const dialogRef = this._dialog.open(ChooseFilenameDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result) => { if(!!result) this.generatePDF(selectedElements,result);} 
    );
  }
}