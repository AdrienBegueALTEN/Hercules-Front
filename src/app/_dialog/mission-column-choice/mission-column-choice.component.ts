import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mission-column-choice',
  templateUrl: './mission-column-choice.component.html',
  styleUrls: ['./mission-column-choice.component.scss']
})
export class MissionColumnChoiceComponent implements OnInit {
  @Output() colsEvent = new EventEmitter<any>();
  selectedCols = [];

  translation: any[] = [
    {name:'select',french:'Séléctionner'},
    {name:'title',french:'Titre'},
    {name:'consultant',french:'Consultant'},
    {name:'customer',french:'Client'},
    {name:'city',french:'Ville'},
    {name:'manager',french:'Manager'},
    {name:'numberOfProjects',french:'Nombre de projets'},
    {name:'sheetStatus',french:'Statut de la fiche'},
  ];


  constructor(private _dialogRef: MatDialogRef<MissionColumnChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onColChanged(event, col: any){
    if(event.checked)
      this.data.cols.push(col)
    else
        this.data.cols = this.data.cols.filter(c => c!==col);
    this.colsEvent.emit(this.data.cols);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.translation, event.previousIndex, event.currentIndex);
    let res = [];
    for(let col of this.translation){
      if(this.data.cols.includes(col.name)){
        res.push(col.name);
      }
    }
    this.colsEvent.emit(res);
  }

}


