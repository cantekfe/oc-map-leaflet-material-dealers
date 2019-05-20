import { Input, Component, OnInit, AfterViewInit } from '@angular/core';
import { LocationProviderService } from '../services/location-provider.service';
import { MapHelperService } from '../services/map-helper.service';
import { ToolboxComponent } from "../toolbox-decorator";

@ToolboxComponent({
  desc: " Map",
  icon: "fa fa-chart-bar",
  componentName: "MapComponent"
})
@Component({
  selector: 'pack-map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapHelperService]

})
export class MapComponent implements AfterViewInit, OnInit {
  @Input() caption: string;
  @Input() test: string;
  @Input() dealers = [];
  isChecked: boolean = true;
  selectedOptions: string[] = ['0'];
  map;
  constructor(private _loc: LocationProviderService, private _helper: MapHelperService) {
  }

  ngOnInit() {
    this._loc.getDealers().subscribe(dealers => {
      console.log(dealers)
      this.dealers = dealers;
    });

  }

  ngAfterViewInit() {
    this._helper.initMap();
    // this._loc.getPositions().subscribe(pos => {
    //   this._helper.drawPoints(pos)
    // });
  }

  onNgModelChange(event) {
    console.log('on ng model change', event, this.isChecked);
    if (event == "" || event== "0,1") { console.log('boş'); }
    else { this._helper.drawPoints(this.isChecked, this.dealers.find(d => d.id == event)); }
  }

}
