import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, DashboardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  AppName = 'BOATCO2';
  shipsData = signal<any[]>([]);
  portsData = signal<any[]>([]); // Updated to store ports data
  filterShipValue = signal<string>('');
  filterPortValue = signal<string>(''); // Add a filter value for ports
  selectedShip = signal<{ name: string, imo: string } | null>(null); 
  selectedPort = signal<{ port: string, country: string } | null>(null); // Add state for selected port
  private map: any; // Leaflet map type dynamically loaded

  // Computed property to filter ships based on input value
  filteredShips = computed(() => {
    const filter = this.filterShipValue().toLowerCase();
    return this.shipsData().filter(ship =>
      ship.name.toLowerCase().includes(filter) || ship.imo.toString().includes(filter)
    );
  });

  // Computed property to filter ports based on input value
  filteredPorts = computed(() => {
    const filter = this.filterPortValue().toLowerCase();
    return this.portsData().filter(port =>
      port.port.toLowerCase().includes(filter) || port.country.toLowerCase().includes(filter)
    );
  });

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.fetchShipsData();
    this.fetchPortsData();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  fetchShipsData() {
    this.apiService.getBoats().subscribe(response => {
      this.shipsData.set(response);
    });
  }

  fetchPortsData() {
    this.apiService.getPorts().subscribe(response => {
      this.portsData.set(response);
    });
  }

  // Update the filter value for ships
  onInputShip(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterShipValue.set(value);
  }

  // Update the filter value for ports
  onInputPort(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterPortValue.set(value);
  }

  // Handle ship selection
  onSelectShip(imo: string) {
    const selectedShip = this.shipsData().find(ship => ship.imo === imo);
    if (selectedShip) {
      this.selectedShip.set({ name: selectedShip.name, imo: selectedShip.imo.toString() });
      console.log(`Selected Ship: ${selectedShip.name} (IMO: ${selectedShip.imo})`);
    }
  }

  // Handle port selection
  onSelectPort(portName: string) {
    const selectedPort = this.portsData().find(port => port.port === portName);
    if (selectedPort) {
      this.selectedPort.set({ port: selectedPort.port, country: selectedPort.country });
      console.log(`Selected Port: ${selectedPort.port}, Country: ${selectedPort.country}`);
    }
  }

  private async initMap(): Promise<void> {
    const L = await import('leaflet');
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);
  }
}
