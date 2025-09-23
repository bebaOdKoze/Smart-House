import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Device } from '../../../models/device';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
@Component({
  selector: 'app-add-device',
  imports: [CommonModule, SelectModule, FormsModule, IftaLabelModule, InputTextModule, DatePickerModule, ButtonModule],
  templateUrl: './add-device.html',
  styleUrl: './add-device.css'
})
export class AddDeviceDialogComponent {
  device: Device = {
    name: '',
    type: '',
    status: 'Off',
    location: '',
    ip: '',
    vendor: '',
    battery: null,
    powerUsage: null,
    lastActive: null
  };

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    if (this.config.data && this.config.data.device) {
      this.device = { ...this.config.data.device };
    }
  }

  save(): void {
    console.log('CLOSE ADD', this.device)
    this.ref.close(this.device);
  }
}