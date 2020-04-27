import { Component, OnInit } from '@angular/core';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultant-card',
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.scss']
})
export class ConsultantCardComponent implements OnInit {
  consultant: any;
  constructor(private consultantService: ConsultantService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.consultantService.getById(+id).subscribe(
      (data)=>{
        this.consultant=data;
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
