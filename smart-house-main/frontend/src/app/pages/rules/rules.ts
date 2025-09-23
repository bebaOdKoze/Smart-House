import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { RulesService } from '../../core/services/rules/rules';
import { AddRuleDialogComponent } from '../dialogs/add-rule/add-rule';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Rule } from '../../models/rule';

@Component({
  selector: 'app-rules',
  imports: [CommonModule, TableModule, CardModule, SelectModule, FormsModule, IftaLabelModule, InputTextModule,
    FloatLabelModule, DatePickerModule, ButtonModule, DatePickerModule, ConfirmDialogModule, Toast],
  templateUrl: './rules.html',
  styleUrl: './rules.css',
  providers: [DialogService, MessageService, ConfirmationService]
})
export class RulesComponent implements OnInit {
  rules: Rule[] = [];
  ref: DynamicDialogRef | undefined;
  selectedRuleType = '';
  selectedStatus = '';
  creatorFilter = '';

  constructor(private rulesService: RulesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  loadRules(): void {
    this.rulesService.getAll().subscribe({
      next: data => this.rules = data,
      error: err => console.error('Error while fetching rules...', err)
    })
  }
  ngOnInit(): void {
    this.loadRules();
  }

  get ruleTypes(): string[] {
    return ['All', ...new Set(this.rules.map(rule => rule.type))];
  }

  get statuses(): string[] {
    return ['All', ...new Set(this.rules.map(rule => rule.status))];
  }

  get filteredRules() {
    return this.rules.filter(rule => {
      const matchesType = this.selectedRuleType === 'All' || this.selectedRuleType === '' || rule.type === this.selectedRuleType;
      const matchesStatus = this.selectedStatus === 'All' || this.selectedStatus === '' || rule.status === this.selectedStatus;
      const matchesCreator = this.creatorFilter === '' || rule.createdBy?.toLowerCase().includes(this.creatorFilter.toLowerCase());
      return matchesType && matchesStatus && matchesCreator;
    });
  }

  toggleRuleStatus(rule: any) {
    let newStatus: string;

    if (rule.status === 'Active') newStatus = 'Inactive';
    else if (rule.status === 'Inactive') newStatus = 'Active';
    else if (rule.status === 'Error') newStatus = 'Inactive';
    else newStatus = 'Active';

    this.rulesService.update(rule._id, { status: newStatus }).subscribe({
      next: updated => {
        rule.status = updated.status;
        this.loadRules();
      },
      error: err => {
        console.error('Error while changing status', err);
      }
    });
  }

  getRuleButtonSeverity(status: string): 'success' | 'danger' | 'help' | 'warn' {
    switch (status) {
      case 'Inactive': return 'success';
      case 'Active': return 'danger';
      case 'Error': return 'help';
      default: return 'warn'
    }
  }

  getRuleButtonIcon(status: string): string {
    switch (status) {
      case 'Inactive': return 'pi pi-play';
      case 'Active': return 'pi pi-pause';
      default: return 'pi pi-refresh'
    }
  }

  openAddRuleDialog() {
    this.ref = this.dialogService.open(AddRuleDialogComponent, {
      header: 'Add New Rule',
      width: '400px',
      modal: true,
      dismissableMask: true
    });

    this.ref.onClose.subscribe((rule) => {
      if (rule) {
        this.rulesService.create(rule).subscribe({
          next: (created) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Rule Added',
              detail: `Rule "${created.name}" was successfully added.`,
              life: 3000
            });
            this.loadRules(); // osveži tabelu
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add Failed',
              detail: 'Failed to add rule. Please try again.',
              life: 3000
            });
            console.error('Error while adding rule', err);
          }
        });
      }
    });
  }


  editRule(rule: any) {
    console.log('RULE PAGE: ', rule)
    this.ref = this.dialogService.open(AddRuleDialogComponent, {
      header: 'Edit Rule',
      width: '500px',
      modal: true,
      dismissableMask: true,
      data: { rule }
    });

    this.ref.onClose.subscribe((updatedRule) => {
      if (updatedRule) {
        console.log('Updating rule...')
        this.rulesService.update(rule._id, updatedRule).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Rule Updated',
              detail: `Rule "${res.name}" was successfully updated.`,
              life: 3000
            });
            this.loadRules(); // osveži tabelu
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Failed to update rule. Please try again.',
              life: 3000
            });
            console.error('Error while updating rule', err);
          }
        });
      }
    });
  }

  deleteRule(event: Event, deviceId: string, ruleName: string) {
    console.log('Delete')
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the rule "${ruleName}"?`,
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
        this.rulesService.delete(deviceId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `Rule "${ruleName}" was successfully deleted.`,
              life: 3000
            });
            this.loadRules();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Failed',
              detail: 'Failed to delete rule. Please try again.',
              life: 3000
            });
            console.error('Error deleting rule:', err);
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: `Deletion of "${ruleName}" was cancelled.`
        });
      }
    });
  }
}