import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mission-column-choice',
  templateUrl: './mission-column-choice.component.html',
  styleUrls: ['./mission-column-choice.component.scss']
})
export class MissionColumnChoiceComponent implements OnInit {
  @Output() colsEvent = new EventEmitter<any>();
  selectedCols = [];


  constructor(private _dialogRef: MatDialogRef<MissionColumnChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onColChanged(event, col: any){
    const index: number = this.data.cols.indexOf(col);
    if (index !== -1)
      this.data.cols[index].selected = !this.data.cols[index].selected;
    this.colsEvent.emit(this.data.cols);
  }

}
