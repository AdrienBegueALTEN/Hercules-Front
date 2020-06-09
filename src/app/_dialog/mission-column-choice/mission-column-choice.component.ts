import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mission-column-choice',
  templateUrl: './mission-column-choice.component.html',
  styleUrls: ['./mission-column-choice.component.scss']
})
export class MissionColumnChoiceComponent implements OnInit {
  /*cols: any[] = ['select', 'title', 'consultant', 'customer', 'city', 'manager', 'numberOfProjects', 'sheetStatus'];*/
  /*cols: any[] = [
    {name:'select',french:'Séléctionner', selected:false},
    {name:'title',french:'Titre', selected:false},
    {name:'consultant',french:'Consultant', selected:false},
    {name:'customer',french:'Client', selected:false},
    {name:'city',french:'Ville', selected:false},
    {name:'manager',french:'Manager', selected:false},
    {name:'numberOfProjects',french:'Nombre de projets', selected:false},
    {name:'sheetStatus',french:'Statut de la fiche', selected:false},
  ];*/
  @Output() colAdded = new EventEmitter<any>();
  selectedCols = [];


  constructor(private _dialogRef: MatDialogRef<MissionColumnChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onColAdded(event, col: any){
    /*if(event.checked)
      this.selectedCols.push(col);
    else{
      const index: number = this.selectedCols.indexOf(col);
      if (index !== -1)
        this.selectedCols.splice(index, 1); 
    }*/
    const index: number = this.data.cols.indexOf(col);
    if (index !== -1)
      this.data.cols[index].selected = !this.data.cols[index].selected;
    console.log(this.data.cols)
  }

}
