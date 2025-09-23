import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Rule } from '../../../models/rule';
import { DeviceService } from '../../../core/services/device/device';
import { Device } from '../../../models/device';

@Component({
  selector: 'app-add-rule',
  imports: [CommonModule, SelectModule, FormsModule, IftaLabelModule, InputTextModule, FloatLabelModule, DatePickerModule, ButtonModule],
  templateUrl: './add-rule.html',
  styleUrl: './add-rule.css'
})
export class AddRuleDialogComponent implements OnInit {
  rule: Rule = {
    name: "",
    type: "",
    condition: "",
    action: "",
    targetDevice: null,
    status: 'Inactive',
    priority: 'Low',
    lastTriggered: '',
    createdBy: '',
    icon: ''
  };

  targetDevices: Device[] = [];
  statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Error', value: 'Error' },
    { label: 'Warning', value: 'Warning' }
  ];

  priorities = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
  ];

  types = [
    { label: 'Comfort', value: 'Comfort' },
    { label: 'Security', value: 'Security' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Environment', value: 'Environment' }
  ]
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private deviceService: DeviceService
  ) {
    this.deviceService.getAll().subscribe({
      next: data => {
        this.targetDevices = data;
        console.log("Successfully fetched devices...");
        console.log('Devices: ', this.targetDevices)
      },
      error: err => console.error('Error while fetching devices...', err)
    });
  }

  ngOnInit(): void {
    if (this.config.data?.rule) {
      this.rule = { ...this.config.data.rule };
    }
    console.log('Loaded rule:', this.rule);
  }

  save(): void {
    console.log('CLOSE ADD', this.rule)
    this.ref.close(this.rule);
  }

  cancel(): void {
    this.ref.close();
  }
}