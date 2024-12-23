import { Component, OnInit, inject, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { GlobalsService } from '../globals.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule], // Add CommonModule
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Fixed typo
  providers: [ApiService]
})
export class SidebarComponent implements OnInit {
  constructor(
    public globals: GlobalsService,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Fetch ships and ports data when the component initializes
    this.fetchShipsData();
    this.fetchPortsData();
  }

  // Computed property to filter ships based on input value
  filteredShips = computed(() => {
    const filter = this.globals.filterShipValue().toLowerCase();
    return this.globals.shipsData().filter(ship =>
      ship.name.toLowerCase().includes(filter) || ship.imo.toString().includes(filter)
    );
  });

  // Computed property to filter ports based on input value
  filteredPorts = computed(() => {
    const filter = this.globals.filterPortValue().toLowerCase();
    const filtered = this.globals.portsData().filter(port =>
      port.port.toLowerCase().includes(filter) || port.country.toLowerCase().includes(filter)
    );

    // Deduplicate ports
    const uniquePorts = Array.from(new Map(filtered.map(port => [port.port, port])).values());
    return uniquePorts;
  });

  // Fetch ships data from the API
  fetchShipsData() {
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getBoats().subscribe(response => {
        this.globals.shipsData.set(response);
      });
    }
  }

  // Fetch ports data from the API
  fetchPortsData() {
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getPorts().subscribe(response => {
        this.globals.portsData.set(response);
      });
    }
  }

  // Update the filter value for ships
  onInputShip(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globals.filterShipValue.set(value);
  }

  // Update the filter value for ports
  onInputPort(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globals.filterPortValue.set(value);
  }

  // Handle ship selection
  onSelectShip(imo: string) {
    const selectedShip = this.globals.shipsData().find(ship => ship.imo === imo);
    if (selectedShip) {
      this.globals.selectedShip.set({ name: selectedShip.name, imo: selectedShip.imo.toString() });
      console.log(`Selected Ship: ${selectedShip.name} (IMO: ${selectedShip.imo})`);
    }
  }

  // Handle port selection
  onSelectPort(portName: string) {
    const selectedPort = this.globals.portsData().find(port => port.port === portName);
    if (selectedPort) {
      this.globals.selectedPort.set({ port: selectedPort.port, country: selectedPort.country });
      console.log(`Selected Port: ${selectedPort.port}, Country: ${selectedPort.country}`);
    }
  }

  // Alias for shipsData from GlobalsService
  get shipsData() {
    return this.globals.shipsData();
  }

  // Alias for shipsData from GlobalsService
  get selectedShip() {
    return this.globals.selectedShip();
  }
}
