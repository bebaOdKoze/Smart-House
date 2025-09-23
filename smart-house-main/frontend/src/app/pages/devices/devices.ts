import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeviceService } from '../../core/services/device/device';
import { AddDeviceDialogComponent } from '../dialogs/add-device/add-device';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Device } from '../../models/device';

@Component({
  selector: 'app-devices',
  imports: [CommonModule, TableModule, CardModule, SelectModule, FormsModule, IftaLabelModule, InputTextModule, FloatLabelModule, DatePickerModule, ButtonModule, DatePickerModule, Toast, ConfirmDialogModule],
  templateUrl: './devices.html',
  styleUrl: './devices.css',
  providers: [DialogService, MessageService, ConfirmationService]
})
export class DevicesComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  ref: DynamicDialogRef | undefined;

  selectedType: string = '';
  selectedStatus: string = '';
  selectedLocation: string = '';

  constructor(
    private deviceService: DeviceService,
    private dialogService: DialogService,
    private messageService: MessageService, 
    private confirmationService : ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  loadDevices(): void {
    this.deviceService.getAll().subscribe({
      next: data => {
        this.devices = data;
        console.log("Successfully fetched devices...");
      },
      error: err => console.error('Error while fetching devices...', err)
    });
  }

  get types() {
    return ['All', ...new Set(this.devices.map(d => d.type))].map(t => ({
      label: t,
      value: t === 'All' ? 'All' : t
    }));
  }

  get statuses() {
    return ['All', ...new Set(this.devices.map(d => d.status))].map(s => ({
      label: s,
      value: s === 'All' ? 'All' : s
    }));
  }

  get locations() {
    return ['All', ...new Set(this.devices.map(d => d.location))].map(l => ({
      label: l,
      value: l === 'All' ? 'All' : l
    }));
  }
  get filteredDevices() {
    console.log(this.selectedStatus);
    return this.devices.filter(device => {
      const matchesType = this.selectedType === 'All' || this.selectedType === '' || device.type === this.selectedType;
      const matchesStatus = this.selectedStatus === 'All' || this.selectedStatus === '' || device.status === this.selectedStatus;
      const matchesLocation = this.selectedLocation === 'All' || this.selectedLocation === '' || device.location === this.selectedLocation;
      return matchesStatus && matchesType && matchesLocation;
    });
  }

  toggleDeviceStatus(device: any) {
    let newStatus: string;

    if (device.status === 'On') newStatus = 'Off';
    else if (device.status === 'Off') newStatus = 'On';
    else if (device.status === 'Opened') newStatus = 'Closed';
    else if (device.status === 'Closed') newStatus = 'Opened';
    else newStatus = 'Off';

    this.deviceService.update(device._id, { status: newStatus }).subscribe({
      next: () => this.loadDevices(),
      error: err => console.error('Error while changing status', err)
    });
  }

  toggleDeviceSeverity(device: any): 'info' | 'success' | 'danger' {
    if (device.status === 'On') return 'danger';
    else if (device.status === 'Off') return 'success';
    else if (device.status === 'Opened') return 'danger';
    else if (device.status === 'Closed') return 'success';
    else return 'danger';
  }

  openAddDeviceDialog() {
    this.ref = this.dialogService.open(AddDeviceDialogComponent, {
      header: 'Add New Device',
      width: '500px',
      modal: true,
      dismissableMask: true
    });

    this.ref.onClose.subscribe((device) => {
      if (device) {
        this.deviceService.create(device).subscribe({
          next: (created) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Device Added',
              detail: `Device "${created.name}" was successfully added.`,
              life: 3000
            });
            this.loadDevices(); // osveži tabelu
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add Failed',
              detail: 'Failed to add device. Please try again.',
              life: 3000
            });
            console.error('Error while adding device', err);
          }
        });
      }
    });
  }

  editDevice(device: any) {
    this.ref = this.dialogService.open(AddDeviceDialogComponent, {
      header: 'Edit Device',
      width: '500px',
      modal: true,
      dismissableMask: true,
      data: { device }
    });

    this.ref.onClose.subscribe((updatedDevice) => {
      if (updatedDevice) {
        console.log('Updating device...')
        this.deviceService.update(device._id, updatedDevice).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Device Updated',
              detail: `Device "${res.name}" was successfully updated.`,
              life: 3000
            });
            this.loadDevices(); // osveži tabelu
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Failed to update device. Please try again.',
              life: 3000
            });
            console.error('Error while updating device', err);
          }
        });
      }
    });
  }

  deleteDevice(event: Event, deviceId: string, deviceName: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the device "${deviceName}"?`,
      header: 'Danger Zone',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.deviceService.delete(deviceId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `Device "${deviceName}" was successfully deleted.`,
              life: 3000
            });
            this.loadDevices();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Failed',
              detail: 'Failed to delete device. Please try again.',
              life: 3000
            });
            console.error('Error deleting device:', err);
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: `Deletion of "${deviceName}" was cancelled.`
        });
      }
    });
  }
}