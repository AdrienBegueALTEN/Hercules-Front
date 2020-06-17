import { HttpHeaders } from '@angular/common/http';

const LETTERS = 'A-ZÉa-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';

export class AppSettings {
    public static EMAIL_PATTERN : string = '^[a-z]+\\.[a-z]+([1-9]|[1-9]\\d?)?@alten\\.com$';
    public static NAME_PATTERN : string = '^([' + LETTERS + ']|([' + LETTERS + '][ -][' + LETTERS + ']))+$';
    public static API_ENDPOINT : string = 'http://localhost:8080/hercules/';
    public static HTTP_JSON_CONTENT = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
}
