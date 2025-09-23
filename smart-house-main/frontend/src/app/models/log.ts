export interface Log {
  _id?: string;
  deviceId: string;         // referenca na Device
  type: string;             // npr. "Error", "Info", "Warning"
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;          // opis događaja
  time: Date;               // vreme loga
}