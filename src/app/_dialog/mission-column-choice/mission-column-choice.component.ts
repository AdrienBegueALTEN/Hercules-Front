import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

/**
 * Component for a dialog window that serves to control the displayed columns in the mission table and their orders.
 */
@Component({
  selector: 'app-mission-column-choice',
  templateUrl: './mission-column-choice.component.html',
  styleUrls: ['./mission-column-choice.component.scss']
})
export class MissionColumnChoiceComponent implements OnInit {
  @Output() colsEvent = new EventEmitter<any>();
  
  /**
   * Selected columns that the user want to display
   */
  selectedCols = [];

  /**
   * Map that links the columns name in english and in french
   */
  translation: any[] = [
    {name:'title',french:'Titre'},
    {name:'consultant',french:'Consultant'},
    {name:'customer',french:'Client'},
    {name:'city',french:'Ville'},
    {name:'country',french:'Pays'},
    {name:'manager',french:'Manager'},
    {name:'numberOfProjects',french:'Nombre de projets'}
  ];


  constructor(private _dialogRef: MatDialogRef<MissionColumnChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.orderTranslation();
  }

  /**
   * Function that is activated when the box of a column is checked and it adds the column.
   * @param event Event done by the user : checking or unchecking
   * @param col Column concerned by the action of the user
   */
  onColChanged(event, col: any){
    if(event.checked)
      this.data.cols.push(col);
    else
      this.data.cols = this.data.cols.filter(c => c!==col);
    this.emitColumns();
  }

  /**
   * Function that is activated when a column was dragged and dropped, it changes its position.
   * @param event Event done by the user : drag and drop
   */
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.translation, event.previousIndex, event.currentIndex);
    this.emitColumns();
  }
  /**
   * Function that sends a list of the columns to the parent.
   */
  private emitColumns(){
    var res = ['select'];
    this.translation.forEach(column => {
      if (this.data.cols.includes(column.name))
        res.push(column.name);
    });
    res.push('sheetStatus');
    this.colsEvent.emit(res);
  }
  /**
   * Function that modifies the order of the columns in translation by using the same order as in data.cols
   */
  private orderTranslation(){
    let newIdx = 0;
    for(let col of this.data.cols){
      if(col != 'select' && col != 'sheetStatus') {
        const c = this.translation.filter(c => c.name==col)[0]
        const currentIdx: number = this.translation.indexOf(c);
        this.move(currentIdx,newIdx,this.translation);
        newIdx++;
      }
    }
  }

  /**
   * Functions that modifies the position of an element in an array 
   * @param from initial position
   * @param to final position
   * @param array array where the element is moved
   */
  private move(from, to, array) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  };


}


