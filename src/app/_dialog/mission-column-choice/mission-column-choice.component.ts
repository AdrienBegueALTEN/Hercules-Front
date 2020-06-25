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

  onColChanged(event, col: any){
    if(event.checked)
      this.data.cols.push(col);
    else
      this.data.cols = this.data.cols.filter(c => c!==col);
    this.emitColumns();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.translation, event.previousIndex, event.currentIndex);
    this.emitColumns();
  }

  private emitColumns(){
    var res = ['select'];
    this.translation.forEach(column => {
      if (this.data.cols.includes(column.name))
        res.push(column.name);
    });
    res.push('sheetStatus');
    this.colsEvent.emit(res);
  }

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

  private move(from, to, array) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  };


}


