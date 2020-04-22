import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MissionService} from '../_services/mission.service';
import {ProjectService} from '../_services/project.service';

@Component({
  selector: 'app-array-mission',
  templateUrl: './array-mission.component.html',
  styleUrls: ['./array-mission.component.scss']
})
export class ArrayMissionComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  pageEvent: PageEvent;

  orderByTitle = 0;
  orderByConsultant = 0;
  orderByCustomer = 0;
  missions: any[];
  projects: any[];

  constructor(private missionService: MissionService, private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.missionService.getMissions().subscribe(
      (data) => {
        this.missions = data;
      }
    );
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      }
    );
    this.dataSource = new MatTableDataSource(this.missions);
    this.dataSource.paginator = this.paginator;
  }

  getProjects(idM: number) {
    return this.projects.filter(project => project.idMission === idM);
  }

  toggleOrderTitle() {
    if (this.orderByTitle === 0) {
      this.orderByTitle = 1;
    } else if (this.orderByTitle === 1) {
      this.orderByTitle = -1;
      this.missions.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      this.orderByTitle = 1;
      this.missions.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  toggleOrderConsultant() {
    if (this.orderByConsultant === 0) {
      this.orderByConsultant = 1;
    } else if (this.orderByConsultant === 1) {
      this.orderByConsultant = -1;
    } else {
      this.orderByConsultant = 1;
    }
  }

  toggleOrderCustomer() {
    if (this.orderByCustomer === 0) {
      this.orderByCustomer = 1;
    } else if (this.orderByCustomer === 1) {
      this.orderByCustomer = -1;
      this.missions.sort((a, b) => a.customer.localeCompare(b.customer));
    } else {
      this.orderByCustomer = 1;
      this.missions.sort((a, b) => b.customer.localeCompare(a.customer));
    }
  }

  getPageData() {
    const missionsPage: any[] = [];
    let min = 0;
    let max = 2;
    if (this.pageEvent) {
      min = this.pageEvent.pageIndex * this.pageEvent.pageSize;
      max = min + this.pageEvent.pageSize;


      if (this.pageEvent.length < max) {
        max = this.pageEvent.length;
      }
    }

    for (let i = min; i < max; i++) {
      missionsPage.push(this.missions[i]);
    }
    return missionsPage;
  }

}




