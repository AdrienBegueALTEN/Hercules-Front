


import { MessageDialogComponent } from './_dialog/message/message-dialog.component';
import { YesNoDialogComponent } from './_dialog/yes-no/yes-no-dialog.component';

import { MatPaginatorIntl } from '@angular/material/paginator';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { authInterceptorProviders } from 'src/app/_helper/auth.interceptor';


import { MissionService } from './_services/mission.service';
import { getFrenchPaginatorIntl } from './_services/french-paginator-intl';
import { SharedModule } from './shared/shared.module';
import { DialogModule } from './_dialog/dialog.module';
import { EditModule } from './_edit/edit.module';
import { PageModule } from './_page/page.module';
import { HeaderModule } from './_header/header.module';
import { ViewModule } from './_view/view.module';
import { ImgBoxModule } from './img-box/img-box.module';
import { InputModule } from './_input/input.module';
import { HomeModule } from './home/home.module';

/**
 * Main module of the application that contains the others
 */
@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      SharedModule,
      DialogModule,
      EditModule,
      PageModule,
      HeaderModule,
      ViewModule,
      ImgBoxModule,
      InputModule,
      HomeModule
   ],
   providers: [
      authInterceptorProviders,
      MissionService,
      {  provide: MatPaginatorIntl, 
         useValue: getFrenchPaginatorIntl() 
      }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      MessageDialogComponent,
      YesNoDialogComponent
   ]
})
export class AppModule { }
