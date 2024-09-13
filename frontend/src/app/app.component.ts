import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, DashboardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  AppName = 'BOATCO2';
  shipsData = signal<any[]>([]);
  filterValue = signal<string>('');

  // This computed property will filter the ships based on the filterValue
  filteredShips = computed(() => {
    const filter = this.filterValue().toLowerCase();
    return this.shipsData().filter(ship =>
      ship.name.toLowerCase().includes(filter) || ship.imo.toString().includes(filter)
    );
  });

  constructor(private apiService: ApiService) {
    this.fetchShipsData();
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
}