import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  public compare(compare : Date, to : Date) : number {
    var comparison : number = this._compareYear(compare, to);
    if (comparison === 0) {
      comparison = this._compareMonth(compare, to);
      if (comparison === 0) {
        comparison = this._compareDay(compare, to);
      }
    }
    return comparison;
  }

  public compareToToday(date : Date) : number {
    return this.compare(date, new Date());
  }

  private _compareYear(date1 : Date, date2 : Date) : number {
    return date1.getFullYear() - date2.getFullYear();
  }

  private _compareMonth(date1 : Date, date2 : Date) : number {
    return date1.getMonth() - date2.getMonth();
  }

  private _compareDay(date1 : Date, date2 : Date) : number {
    return date1.getDate() - date2.getDate();
  }

  public userIsActive(user : any) : boolean {
    return user.releaseDate == null || this.compareToToday(new Date(user.releaseDate)) > 0;
  }

}
