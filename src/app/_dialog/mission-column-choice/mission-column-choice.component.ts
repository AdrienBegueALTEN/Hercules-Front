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
    {name:'select',french:'Livret PDF'},
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
    this.orderTranslation();
  }

  onColChanged(event, col: any){
    if(event.checked)
      this.data.cols.push(col)
    else
      this.data.cols = this.data.cols.filter(c => c!==col);
    this.emitColumns();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.translation, event.previousIndex, event.currentIndex);
    this.emitColumns();
  }

  private emitColumns(){
    let res = [];
    for(let col of this.translation){
      if(this.data.cols.includes(col.name)){
        res.push(col.name);
      }
    }
    this.colsEvent.emit(res);
  }

  private orderTranslation(){
    let res = [];
    let newIdx = 0;
    for(let col of this.data.cols){
      const c = this.translation.filter(c => c.name==col)[0]
      const currentIdx: number = this.translation.indexOf(c);
      this.move(currentIdx,newIdx,this.translation);
      newIdx++;
    }
  }

  private move(from, to, array) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  };


}


