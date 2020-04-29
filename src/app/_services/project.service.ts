import {Observable, Subject, of} from 'rxjs';

export class ProjectService {
  constructor() {
  }

  getProjects(): Observable<Project[]> {
    return of(projects);
  }


}


export interface Project {
  id: number;
  idMission: number;
  title: string;
}

const projects = [
  {
    id: 1,
    idMission: 1,
    title: 'Aide au développement d\'une plateforme logistique'
  },
  {
    id: 2,
    idMission: 1,
    title: 'Architecture de la plateforme'
  }
];
