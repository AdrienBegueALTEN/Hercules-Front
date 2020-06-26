import { HttpHeaders } from '@angular/common/http';

/**
 * Defines the global app properties
 */

const LETTERS = 'A-ZÉa-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';

export class AppSettings {
    /**
     * Defines the allowed email pattern
     */
    public static EMAIL_PATTERN : string = '^[a-z]+\\.[a-z]+([1-9]|[1-9]\\d?)?@alten\\.com$';
    /**
     * Defines the allowed name pattern
     */
    public static NAME_PATTERN : string = '^([' + LETTERS + ']|([' + LETTERS + '][ -][' + LETTERS + ']))+$';
    /**
     * Defines the API path
     */
    public static API_ENDPOINT : string = 'http://localhost:8080/hercules/';
    /**
     * Defines the type of content
     */
    public static HTTP_JSON_CONTENT = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    /**
     * Defines the customer logo path
     */
    public static CUSTOMER_LOGO_PATH : string = AppSettings.API_ENDPOINT + 'customers/logo/';
    /**
     * Defines the project picture path
     */
    public static PROJECT_PICTURE_PATH : string = AppSettings.API_ENDPOINT + 'missions/projects/picture/';
}
