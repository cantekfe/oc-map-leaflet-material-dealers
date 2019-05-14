import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MapModule } from '../../../../c-map-dealers/src/public_api';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MapModule
    
    ],

  declarations: [
    AppComponent,
    HelloComponent
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
