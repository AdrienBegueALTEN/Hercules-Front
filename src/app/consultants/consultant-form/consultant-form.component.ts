import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultantService } from 'src/app/_services/consultant.service';
import {  Router } from '@angular/router';
import { ConsultantNewDiplomaComponent } from '../../_form/consultant-new-diploma/consultant-new-diploma.component';

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.scss']
})
export class ConsultantFormComponent implements OnInit {
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  @Input() consultant:any;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }


  createComponent(consultantId:number) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(ConsultantNewDiplomaComponent);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.consultantId=consultantId;
}
}
