import { Component } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public globals: GlobalsService) {}  
}
