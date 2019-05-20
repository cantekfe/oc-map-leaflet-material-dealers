import { Injectable } from '@angular/core';
import * as L from "leaflet";
import 'leaflet-curve';
@Injectable()
export class MapHelperService {
  public map;
  marker = [
    {
      id: 1, 
      used: false, 
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
      iconSize: [18, 35]
    },
    {
      id: 2, 
      used: false, 
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
      iconSize: [18, 35]
    },
    {
      id: 3, 
      used: false, 
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
      iconSize: [18, 35]
    },
    {
      id: 4, 
      used: false, 
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
      iconSize: [18, 35]
    },
    {
      id: 5, 
      used: false, 
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
      iconSize: [18, 35]
    },
    {
      id: 6, 
      used: false, 
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
      iconSize: [18, 35]
    }
  ]
  colors = [
    { id: 1, used: false, color: "#66ff66" },
    { id: 2, used: false, color: "#ff0000" },
    { id: 3, used: false, color: "#6666ff" },
    { id: 4, used: false, color: "#00ffff" },
    { id: 5, used: false, color: "#cc0066" },
    { id: 6, used: false, color: "#006666" }
  ]

  dealerStyles = [
    {
      dealerId: 0,
      markerId: 0,
      colorId: 0,
    }
  ]

  initMap() {
    var corner1 = L.latLng(85, -180),
      corner2 = L.latLng(-85, 180),
      bounds = new L.LatLngBounds(corner1, corner2);
    this.createMap(bounds);

  }

  createMap(bounds) {
    this.map = new L.Map("map", {
      center: bounds.getCenter(),
      zoom: 12,
      maxBounds: bounds,
      maxBoundsViscosity: 0.75
    });

    let centerCoord = new L.LatLng(39.925533, 32.866287);
    this.setView(centerCoord);
  }

  setView(latLang) {
    this.map.setView(latLang);
    L.tileLayer(`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
      maxZoom: 2,
      attribution: 'HOT'
    }).addTo(this.map);
  }

  drawPoints(isChecked, dealer) {
    let _this = this;

    let marker, lineColor;
    // Change marker and color status according to isChecked param
    if (isChecked) {
      marker = this.marker.find(m => !m.used);
      lineColor = this.colors.find(m => !m.used);

      marker.used = true;
      lineColor.used = true;
      // push used marker and color into dealer's style
      this.dealerStyles.push({
        dealerId: dealer.id,
        markerId: marker.id,
        colorId: lineColor.id
      });
    } else {
      // let's make the marker & color reusable 
      let stil = this.dealerStyles.find(s => s.dealerId == dealer.id);
      this.marker.find(m => m.id == stil.markerId).used = false;
      this.colors.find(c => c.id == stil.colorId).used = false;
    }


    // Mark dealer
    _this.addMarker(marker, dealer.pos.lat, dealer.pos.lon, dealer.name);

    dealer.clients.forEach(client => {
      // mark companies
      _this.addMarker(marker, client.pos.lat, client.pos.lon, client.name)
      // draw line between dealer and dealer's client
      _this.drawLineSrcToDest(lineColor, dealer.pos, client.pos)
    });
    // setView(odak noktası)
  }

  addMarker(marker, lat, lng, name) {

    var greenIcon = L.icon({ iconUrl:marker.iconUrl, iconSize:marker.iconSize });

    let m = L.marker([lat, lng], { icon: greenIcon }).addTo(this.map).bindPopup(name);
  }

  drawLineSrcToDest(lineColor, src, dest) {
    var latLangs = this.createLatLangs(src, dest);
    this.curvedPath(lineColor,latLangs);
  }

  curvedPath(lineColor,latLangs) {
    var pathOptions = {
      color: lineColor.color,
      weight: 3
    }
    var curvedPath = L.curve(
      [
        'M', latLangs[0],
        'Q', latLangs[1],
        latLangs[2]
      ], pathOptions).addTo(this.map);
  }

  createLatLangs(src, dest) {
    var latlngs = [];

    var latlng1 = [src.lat, src.lon],
      latlng2 = [dest.lat, dest.lon];

    var offsetX = latlng2[1] - latlng1[1],
      offsetY = latlng2[0] - latlng1[0];

    var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
      theta = Math.atan2(offsetY, offsetX);

    var thetaOffset = (3.14 / 10);

    var r2 = (r / 2) / (Math.cos(thetaOffset)),
      theta2 = theta + thetaOffset;

    var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
      midpointY = (r2 * Math.sin(theta2)) + latlng1[0];

    var midpointLatLng = [midpointY, midpointX];

    latlngs.push(latlng1, midpointLatLng, latlng2);

    return latlngs;
  }


}