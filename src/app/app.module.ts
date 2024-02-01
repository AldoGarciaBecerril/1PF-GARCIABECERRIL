import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { StudentsModule } from './layouts/students/students.module';
import { registerLocaleData } from '@angular/common';

import es from '@angular/common/locales/es';
import esMX from '@angular/common/locales/es-MX';

registerLocaleData(es);
registerLocaleData(esMX);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    StudentsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-MX',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
