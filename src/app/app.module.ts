import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {MatCardModule, MatListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import{MapModule} from '../../projects/c-map-dealers/src/lib/map.module'
@NgModule({
  imports: [ BrowserModule, FormsModule, MatCardModule,MatListModule,FlexLayoutModule ,MapModule ],
  declarations: [ 
    AppComponent,
     ],  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
