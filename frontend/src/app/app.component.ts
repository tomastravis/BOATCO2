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
  filterValue = signal<string>('');
  private map: any; // Leaflet map type dynamically loaded
// This computed property will filter the ships based on the filterValue
filteredShips = computed(() => {
  const filter = this.filterValue().toLowerCase();
  return this.shipsData().filter(ship =>
    ship.name.toLowerCase().includes(filter) || ship.imo.toString().includes(filter)
  );
});
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.fetchShipsData();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only run the map initialization in the browser
      this.initMap();
      this.loadMapData();
    }
  }

  fetchShipsData() {
    this.apiService.getBoats().subscribe(response => {
      this.shipsData.set(response);
    });
  }

// Call this when the input changes
onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.filterValue.set(value);  // Update the filter signal with the input value
}

// Handle selection (optional)
onSelectShip(imo: string) {
  console.log('Selected ship IMO:', imo);
}
  private async initMap(): Promise<void> {
    // Dynamically load Leaflet for client-side only
    const L = await import('leaflet');
    
    // Initialize the map centered on the world
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);
  }

  private loadMapData(): void {
    this.apiService.getRoutes().subscribe(async data => {
      const L = await import('leaflet');

      // Plot routes (connections between points)
      data.routes.forEach((route: any) => {
        const latlngs = [
          [route.from.lat, route.from.lon],
          [route.to.lat, route.to.lon]
        ];
        L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
      });

      // Plot nodes (ports and regular points)
      data.nodes.forEach((node: any) => {
        const marker = L.circleMarker([node.lat, node.lon], {
          radius: 5,
          color: node.is_port ? 'green' : 'red'
        }).addTo(this.map);

        // Add tooltip to show if it's a port or not
        marker.bindTooltip(node.is_port ? "Port" : "Not a Port");
      });
    });
  }
}
