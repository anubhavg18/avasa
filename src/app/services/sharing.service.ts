import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private storageName: any = "Settings";

  constructor() { }

  setSettings(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  getUserSettings() {
    let data = localStorage.getItem(this.storageName);
    return JSON.parse(data);
  }

  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }

}