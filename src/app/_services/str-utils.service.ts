import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrUtilsService {

  public getNormalizedEmail(firstname : string, lastname : string) : string {
    firstname = this._normalizeName(firstname);
    lastname = this._normalizeName(lastname);
    return firstname.concat('.', lastname, '@alten.com');
  }

  private _normalizeName(str : string) : string {
    str = str.toLocaleLowerCase();
    str = str.replace(/[àáâãäå]/g, 'a');
    str = str.replace(/[éèëê]/g, 'e');
    str = str.replace(/[ìíîï]/g, 'i');
    str = str.replace(/[òóôõö]/g, 'o');
    str = str.replace(/[ùúûü]/g, 'u');
    str = str.replace(/[ýÿ]/g, 'y');
    str = str.replace(/ç/g, 'c');
    str = str.replace(/[ -]/g, '');
    return str;
  }

}
