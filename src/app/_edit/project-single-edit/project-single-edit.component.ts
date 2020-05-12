import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html',
  styleUrls: ['./project-single-edit.component.scss']
})
export class ProjectSingleEditComponent implements OnInit {

  @Input() project;
  projectForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _projectService: ProjectService) { }

  ngOnInit(): void {
    this.initExistingForm();
  }

  public setProject(project: any){
    this.project = project;
    this.ngOnInit();
  }

  initExistingForm(){
    this.projectForm = this._formBuilder.group({
      title: new FormControl(this.project.title),
      description: new FormControl(this.project.description),
      beginDate: new FormControl(this.project.beginDate),
      endDate: new FormControl(this.project.endDate)
    });
  }

  /*updateProject(field: string){
    this._projectService.updateproject(this.project.id,field, null).subscribe();
  }*/

}
