import { HttpHeaders } from '@angular/common/http';

export class AppSettings {

    private static MIN = 'a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';
    
    public static EMAIL_LOCAL_PART_PATTERN = '^[a-z]+\\.[a-z]+([1-9](\\d)?)?$';
    public static EMAIL_PATTERN = '^[a-z]+\\.[a-z]+([1-9]|[1-9]\\d?)?@alten\\.com$';
    public static FIRSTNAME_PATTERN = '^[A-ZÉ]([' + AppSettings.MIN + ']|([' + AppSettings.MIN + '][ -][A-ZÉ' + AppSettings.MIN + ']))*$';
    public static LASTNAME_PATTERN = '^[A-Z' + AppSettings.MIN + ']([' + AppSettings.MIN + ']|([' + AppSettings.MIN + '][ -][A-Z' + AppSettings.MIN + ']))*$';
    public static API_ENDPOINT = 'http://localhost:8080/hercules/';
    public static AUTH_API = AppSettings.API_ENDPOINT + 'auth/';
    public static CONSULTANT_API = AppSettings.API_ENDPOINT + 'consultants/';
    public static CUSTOMER_API = AppSettings.API_ENDPOINT + 'customers/';
    public static MISSION_API = AppSettings.API_ENDPOINT + 'missions/';
    public static HTTP_OPTIONS = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

}
