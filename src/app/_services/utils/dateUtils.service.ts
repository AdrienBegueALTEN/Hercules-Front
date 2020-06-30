import { Injectable } from '@angular/core';

/**
 * Service used for comparing dates to konw if a user is active
 */
@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  /**
   * General function to compare 2 dates, it returns the difference in the adapted unity
   * @param compare first date
   * @param to second date
   * @returns the difference between the 2 dates in years, months or days
   */
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
   * Function that compares a given date and the one of today
   * @param date Date compared to today
   * @returns the difference between today and the date
   */
  public compareToToday(date : Date) : number {
    return this.compare(date, new Date());
  }

  /**
   * Function that gives the difference in years between 2 dates
   * @param date1 first date
   * @param date2 second date
   * @returns Difference in years between the 2 dates 
   */
  private _compareYear(date1 : Date, date2 : Date) : number {
    return date1.getFullYear() - date2.getFullYear();
  }

  /**
   * Function that gives the difference in months between 2 dates
   * @param date1 first date
   * @param date2 second date
   * @returns Difference in months between the 2 dates 
   */
  private _compareMonth(date1 : Date, date2 : Date) : number {
    return date1.getMonth() - date2.getMonth();
  }

  /**
   * Function that gives the difference in days between 2 dates
   * @param date1 first date
   * @param date2 second date
   * @returns Difference in days between the 2 dates 
   */
  private _compareDay(date1 : Date, date2 : Date) : number {
    return date1.getDate() - date2.getDate();
  }

  /**
   * Function that checks if a user is valid by comparing his release's date with today's date if he has one
   * @param user checked user
   */
  public userIsActive(user : any) : boolean {
    return user.releaseDate == null || this.compareToToday(new Date(user.releaseDate)) > 0;
  }

}
