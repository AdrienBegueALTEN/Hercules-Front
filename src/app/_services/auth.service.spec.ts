/* tslint:disable:no-unused-variable */

import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('Service: Auth', () => {

  let injector: TestBed;
  let authService: AuthService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    injector = getTestBed();
    authService = injector.get(AuthService);
    httpTest = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpTest.verify();
  });  

  it('login() with good identifiers', () => {
    authService.login({ email:"admin.admin@alten.com" , password:"azertyuiop" }).subscribe((res) => {
      
      expect(res).toEqual({ user:{
          id: 1,
          firstname: "Admin",
          lastname: "Admin",
          roles: ["MANAGER","ADMIN"]
        }
      });
    });

    const req = httpTest.expectOne('http://localhost:8080/hercules/auth/signin');
    expect(req.request.method).toBe('POST');
    req.flush({ user:{
      id: 1,
      firstname: "Admin",
      lastname: "Admin",
      roles: ["MANAGER","ADMIN"]
      }
    });
  });



  it('changePassword() good changement of password with status 200', () => {
    authService.changePassword("azertyuiop" , "azertyuiop1" ).subscribe((res) => {
      
      expect(res.status).toEqual(200);
    });

    const req = httpTest.expectOne('http://localhost:8080/hercules/auth/change-password');
    expect(req.request.method).toBe('PUT');
    req.flush({status: 200});
  });


  


});
