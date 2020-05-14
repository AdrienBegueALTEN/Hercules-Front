import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html',
  styleUrls: ['./project-single-edit.component.scss']
})
export class ProjectSingleEditComponent implements OnInit {

  @Input() project;
  @Output() reload = new EventEmitter<any>();
  projectForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _snackBar: MatSnackBar) { }

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
      beginDate: new FormControl(new Date(this.project.beginDate).toISOString().substr(0, 10)),
      endDate: new FormControl(new Date(this.project.endDate).toISOString().substr(0, 10))
    });
  }

  updateProject(field: string){
      this._projectService.updateproject(this.project.id,field, this.projectForm.controls[field].value).subscribe(
        () => {
          this.reload.emit();
          this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
        },
        (err) => {
          this._snackBar.open(err.error, 'X', {duration: 2000});
        }
      );
  }

}
