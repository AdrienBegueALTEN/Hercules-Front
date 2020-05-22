import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator-projects',
  templateUrl: './paginator-projects.component.html',
  styleUrls: ['./paginator-projects.component.scss']
})
export class PaginatorProjectsComponent implements OnInit {
  @Input() optionAdd: boolean;
  @Input() projects;
  @Output() index = new EventEmitter<any>();
  currentIndex;
  constructor() { }

  ngOnInit(): void {
    this.currentIndex = 0;
  }

  onNext(){
    if(this.currentIndex+1 < this.projects.length){
      this.currentIndex++;
      this.index.emit(this.currentIndex);
    }
  }

  onPrevious(){
    if(this.currentIndex-1 >= 0){
      this.currentIndex--;
      this.index.emit(this.currentIndex);
    }
  }


}
