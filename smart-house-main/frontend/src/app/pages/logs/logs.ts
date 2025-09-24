import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { LogsService } from '../../core/services/logs/logs';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, TableModule, CardModule, SelectModule, FormsModule, IftaLabelModule, InputTextModule, FloatLabelModule, DatePickerModule],
  templateUrl: './logs.html',
  styleUrl: './logs.css'
})
export class LogsComponent implements OnInit {
  logs: any[] = [];

  rangeDates: Date[] | undefined;
  selectedType: string = '';
  textFilter: string = '';

  constructor(private logsService: LogsService) { }
  ngOnInit(): void {
    this.logsService.getAll().subscribe({
      next: data => this.logs = data,
      error: err => console.error('Error while fetching logs...', err)
    });
  }

  get types(): string[] {
    return ['All', ...new Set(this.logs.map(log => log.type))]
  }

  get filteredLogs() {
    return this.logs.filter(log => {
      const matchesType = this.selectedType === 'All' || this.selectedType === '' || log.type === this.selectedType;
      const matchesMessage = !this.textFilter || log.message.toLowerCase().includes(this.textFilter.toLowerCase()) ||
        log.device.toLowerCase().includes(this.textFilter.toLowerCase());

      const matchesDate = (() => {
        if (!this.rangeDates || this.rangeDates.length === 0) return true;

        const logDate = new Date(log.time);

        // normalizuj vreme na 0:00
        const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());

        if (this.rangeDates.length === 1) {
          const selectedDate = this.rangeDates[0];
          return (
            logDay.getFullYear() === selectedDate.getFullYear() &&
            logDay.getMonth() === selectedDate.getMonth() &&
            logDay.getDate() === selectedDate.getDate()
          );
        }

        if (this.rangeDates.length === 2) {
          let [start, end] = this.rangeDates;
          start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
          end = new Date(end.getFullYear(), end.getMonth(), end.getDate());
          return logDay >= start && logDay <= end;
        }

        return true;
      })();

      return matchesType && matchesMessage && matchesDate;
    });
  }
}