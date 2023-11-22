import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  key = "j9XKjynl4b/lWH3F+2vTbNVfG6iOfUnY1fy95pOisWC7VW5h9gAL+vZ22s9S2t4g"
  
  constructor() { }

  encrypt (message: string): string {
    return CryptoJS.TripleDES.encrypt(message, this.key).toString()
  }

  decrypt(crypted: string): string {
    return CryptoJS.TripleDES.decrypt(crypted, this.key).toString(CryptoJS.enc.Utf8)
  }
}
