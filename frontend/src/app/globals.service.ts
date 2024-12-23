import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  AppName: string = "BOATCO2"
  shipsData = signal<any[]>([]);
  portsData = signal<any[]>([]); // Updated to store ports data
  filterShipValue = signal<string>('');
  filterPortValue = signal<string>(''); // Add a filter value for ports
  selectedShip = signal<{ name: string, imo: string } | null>(null); 
  selectedPort = signal<{ port: string, country: string } | null>(null); // Add state for selected port
  map: any; // Leaflet map type dynamically loaded
  constructor() { }
}
