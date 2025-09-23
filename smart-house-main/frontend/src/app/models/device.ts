import { Log } from "./log";
import { Rule } from "./rule";

export interface Device {
  _id?: string;          // MongoDB ID
  name: string;          // npr. "Smart Thermostat"
  type: string;          // npr. "Thermostat", "Camera"
  status: 'On' | 'Off' | 'Opened' | 'Closed'; 
  location?: string;     // npr. "Living Room"
  ip?: string;           // IPv4/IPv6 adresa
  battery?: number | null;   // %
  powerUsage?: number | null; // W
  vendor?: string;       // npr. "Nest", "Philips"
  lastActive?: Date | null;
  logs?: Log[];          // povezani logovi
  rules?: Rule[]
}