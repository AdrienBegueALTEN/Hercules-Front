import { Injectable } from '@angular/core';

/**
 * Handles functions related to dates
 */
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

  /**
   * Compares a date to today date
   * @param date Date to compare
   */
  public compareToToday(date : Date) : number {
    return this.compare(date, new Date());
  }

  /**
   * Compares two years
   * @param date1 First date to compare
   * @param date2 Second date to compare
   */
  private _compareYear(date1 : Date, date2 : Date) : number {
    return date1.getFullYear() - date2.getFullYear();
  }

  /**
   * Compares two months
   * @param date1 First date to compare
   * @param date2 Second date to compare
   */
  private _compareMonth(date1 : Date, date2 : Date) : number {
    return date1.getMonth() - date2.getMonth();
  }

/**
 * Compares two days
 * @param date1 First date to compare
 * @param date2 Second date to compare
 */
  private _compareDay(date1 : Date, date2 : Date) : number {
    return date1.getDate() - date2.getDate();
  }

  /**
   * Checks whether an user is active by checking current date and the set release date
   * @param user User to check
   */
  public userIsActive(user : any) : boolean {
    return user.releaseDate == null || this.compareToToday(new Date(user.releaseDate)) > 0;
  }

}
