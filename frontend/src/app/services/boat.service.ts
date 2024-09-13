import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  private apiEndpoint = 'http://backend:8000/get_boats'; // Your API endpoint
  private boats = [];

  constructor(private httpClient: HttpClient) {}

  // Function to get boats from the API
  getBoats(){
    this.httpClient.get(this.apiEndpoint + '/get_boats').subscribe((res)=>{
      console.log(res);
      this.boats = res;
  });
}
}
