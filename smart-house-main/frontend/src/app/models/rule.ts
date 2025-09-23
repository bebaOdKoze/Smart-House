import { Device } from "./device";

export interface Rule {
  name: string;
  type: string;
  condition: string;
  action: string;
  targetDevice?: Device | null;
  status: 'Active' | 'Inactive';
  priority: 'Low' | 'Medium' | 'High';
  lastTriggered?: string | null;
  createdBy?: string;
  icon?: string;
}
