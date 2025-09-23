import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TableModule, CardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // Statističke kartice
  stats = {
    devicesOnline: 12,
    rulesEnabled: 8,
    energyUsage: '320 kWh',
    alerts: 3
  };

  // Logovi aktivnosti
  logs = [
    {
      time: '2025-09-15 14:20',
      device: 'Thermostat',
      message: 'Temperature adjusted to 22°C',
      status: 'Success'
    },
    {
      time: '2025-09-15 13:58',
      device: 'Smart Lock',
      message: 'Unauthorized access attempt',
      status: 'Warning'
    },
    {
      time: '2025-09-15 13:00',
      device: 'Garage Camera',
      message: 'Motion detected',
      status: 'Success'
    },
    {
      time: '2025-09-15 09:12',
      device: 'Smart Plug',
      message: 'Power surge detected',
      status: 'Error'
    }
  ];

  // Boje statusa za prikaz u tabeli
  getStatusClass(status: string): string {
    switch (status) {
      case 'Success':
        return 'status-success';
      case 'Warning':
        return 'status-warning';
      case 'Error':
        return 'status-error';
      default:
        return '';
    }
  }

}
