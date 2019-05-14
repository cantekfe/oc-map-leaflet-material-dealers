import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


@Injectable()
export class LocationProviderService {
  getDealers(): Observable<any> {
    return Observable.of([

        {
          "id": "0",
          "name": "Cantek",
          "pos": {
            "lat": 38.889931,
            "lon": -77.009003
          },
          clients: [
            {
              "id": "1",
              "name": "Company-1",
              "pos": {
                "lat": 36.778259,
                "lon": -119.4179
              }
            },
            {
              "id": "2",
              "name": "Company-2",
              "pos": {
                "lat": 55.761681,
                "lon": -120.191788
              }
            },
            {
              "id": "3",
              "name": "Company-3",
              "pos": {
                "lat": 50.761681,
                "lon": -70.191788
              }
            }
          ]
        },
        {
          "id": "1",
          "name": "Alanya",
          "pos": {
            "lat": 58.889931,
            "lon": -77.009003
          },
          clients: [
            {
              "id": "1",
              "name": "Company-1",
              "pos": {
                "lat": 46.778259,
                "lon": -119.4179
              }
            },
            {
              "id": "2",
              "name": "Company-2",
              "pos": {
                "lat": 45.761681,
                "lon": -120.191788
              }
            },
            {
              "id": "3",
              "name": "Company-3",
              "pos": {
                "lat": 60.761681,
                "lon": -70.191788
              }
            }
          ]
        }


      ]).delay(1000);
  }
}