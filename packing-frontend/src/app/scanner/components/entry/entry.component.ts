import { Component } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  NFCErrored: boolean = false;
  error: string = '';
  abortController = new AbortController();
  isScanning: boolean = false;

  async startScan() {
    if (!('NDEFReader' in window)) {
      const error = 'Web NFC not supported';
      this.error = error;
      this.NFCErrored = true;
      return console.log(error);
    }

    try {
      const ndef = new NDEFReader();
      const signal = this.abortController.signal;

      await ndef.scan({ signal });

      ndef.addEventListener('readingerror', () => {
        const error = "Couldn't read from NFC tag, try another one";
        this.error = error;
        this.NFCErrored = true;
        console.log(error);
      });

      ndef.addEventListener('reading', (e) => {
        console.log({ e });
      });

      this.isScanning = true;
    } catch (error) {
      this.abortController.abort();
      this.error = 'Error occured!';
      console.log(error);
      this.NFCErrored = true;
      console.log({ error });
    }
  }

  stopScan() {
    this.abortController.abort();
    this.isScanning = false;
  }
}
