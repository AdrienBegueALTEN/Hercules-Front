import { HttpHeaders } from '@angular/common/http';

export class AppSettings {

    private static LETTERS = 'A-ZÉa-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';

    public static EMAIL_PATTERN : string = '^[a-z]+\\.[a-z]+([1-9]|[1-9]\\d?)?@alten\\.com$';
    public static NAME_PATTERN : string = '^([' + AppSettings.LETTERS + ']|([' + AppSettings.LETTERS + '][ -][' + AppSettings.LETTERS + ']))+$';
    public static API_ENDPOINT : string = 'http://localhost:8080/hercules/';
    public static AUTH_API : string  = AppSettings.API_ENDPOINT + 'auth/';
    public static CONSULTANT_API : string = AppSettings.API_ENDPOINT + 'consultants/';
    public static CUSTOMER_API : string = AppSettings.API_ENDPOINT + 'customers/';
    public static MISSION_API : string = AppSettings.API_ENDPOINT + 'missions/';
    public static DIPLOMA_API : string = AppSettings.API_ENDPOINT + 'diplomas/';
    public static MANAGER_API : string = AppSettings.API_ENDPOINT + 'managers/';
    public static PROJECT_API : string = AppSettings.API_ENDPOINT + 'projects/';
    public static HTTP_JSON_CONTENT = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
}
