import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Location} from "../Models/Location"
import * as L from 'leaflet';
import 'leaflet-routing-machine'
import 'leaflet-control-geocoder'
@Component({
  selector: 'app-sight-location-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sight-location-route.component.html',
  styleUrl: './sight-location-route.component.scss'
})
export class SightLocationRouteComponent implements OnInit{
  @Input({required: true}) location!: Location
  @Input({required: true}) markerText!: string;
  private map: any;
  ngOnInit() {
    const icon = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png',
      iconSize: [28,40],
      shadowSize: [68,95]
    })
    navigator.geolocation.getCurrentPosition(pos => {
      const latLng = {lat: pos.coords.latitude, lng: pos.coords.longitude}
      L.marker(latLng).addTo(this.map)
        .bindPopup('You are here')

      L.Routing.control({
        waypoints: [
          L.latLng(latLng),
          L.latLng({lat: this.location.latitude, lng: this.location.longitude})
        ]
      }).addTo(this.map)
    })



    this.map = L.map('map').setView([this.location.latitude, this.location.longitude], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.location.latitude, this.location.longitude],{icon: icon}).addTo(this.map)
      .bindPopup(this.markerText)
  }
}
