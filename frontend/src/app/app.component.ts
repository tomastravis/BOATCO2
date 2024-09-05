import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
  data = signal<any>(null);
  AppName = 'BOATCO2'

  constructor(private apiService: ApiService) {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getBoats().subscribe(response => {
      this.data.set(response);
    });
  }
}