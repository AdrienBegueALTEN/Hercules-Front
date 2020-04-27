import { HttpHeaders } from '@angular/common/http';

export class AppSettings {

    private static LETTERS = 'A-ZÉa-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';
    
    public static EMAIL_PATTERN = '^[a-z]+\\.[a-z]+([1-9]|[1-9]\\d?)?@alten\\.com$';
    public static NAME_PATTERN = '^([' + AppSettings.LETTERS + ']|([' + AppSettings.LETTERS + '][ -][' + AppSettings.LETTERS + ']))+$';
    public static API_ENDPOINT = 'http://localhost:8080/hercules/';
    public static AUTH_API = AppSettings.API_ENDPOINT + 'auth/';
    public static CONSULTANT_API = AppSettings.API_ENDPOINT + 'consultants/';
    public static CUSTOMER_API = AppSettings.API_ENDPOINT + 'customers/';
    public static MISSION_API = AppSettings.API_ENDPOINT + 'missions/';
    public static HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
}
