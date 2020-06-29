import { Injectable } from '@angular/core';

/**
 * Normalizes the user input
 */
@Injectable({
  providedIn: 'root'
})

export class StrUtilsService {
  /**
 *  Changes the user input to make searching by name easier.
 * For instance, if someone is called "Bègue", the user will be able to find him by typing "Begue"
 */
  public normalizeName(str : string) : string {
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
