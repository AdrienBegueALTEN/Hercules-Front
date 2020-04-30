import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultantService } from 'src/app/_services/consultant.service';
import {  Router } from '@angular/router';
import { ConsultantNewDiplomaComponent } from '../consultant-new-diploma/consultant-new-diploma.component';

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.scss']
})
export class ConsultantFormComponent implements OnInit {
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  @Input() consultant:any;
  consultantForm: FormGroup;

  constructor(private consultantService: ConsultantService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.consultantForm = this.formBuilder.group({
      firstname: new FormControl(this.consultant.firstname),
      lastname: new FormControl(this.consultant.lastname),
      email: new FormControl(this.consultant.email),
      experience: new FormControl(this.consultant.experience),
      manager: new FormControl(this.consultant.manager.firstname+' '+this.consultant.manager.lastname)
    });
  }

  onSubmit(){
    const values = this.consultantForm.value;
    const consultant={
      'id':this.consultant.id,
      'email':values.email,
      'lastname':values.lastname,
      'firstname':values.firstname,
      'experience':values.experience
    };
    
    this.consultantService.updateConsultant(consultant).subscribe(
      ()=>{},
      (err) => {console.log}
    )

    this.route.navigateByUrl('/consultants/'+this.consultant.id);

  }

  createComponent() {
    const factory = this.resolver.resolveComponentFactory(ConsultantNewDiplomaComponent);
    const componentRef = this.entry.createComponent(factory);
}
}
