import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {MapComponent} from './map/map.component';
import {LocationProviderService}  from './services/location-provider.service'
import {MatCardModule, MatListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [ BrowserModule, FormsModule, MatCardModule,MatListModule,FlexLayoutModule  ],
  declarations: [ 
    AppComponent,
    MapComponent,
     ],
  providers:[LocationProviderService],   
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
