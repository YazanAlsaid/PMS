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
  readCards: {
    serialNumber: string;
    data: string;
  }[] = [
    {
      serialNumber: '123456789',
      data: ' ',
    },
  ];
  displayedColumns: string[] = ['serialNumber', 'data'];

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

      ndef.onreading = (event) => {
        console.log(event);
        console.log(event.serialNumber);

        this.readCards = [
          ...this.readCards,
          { serialNumber: event.serialNumber, data: ' ' },
        ];

        console.log({ readCards: this.readCards });
        // this.stopScan();
      };

      ndef.onreadingerror = (error) => {
        console.log(error);
        const errorMsg = "Couldn't read from NFC tag, try another one";
        this.error = errorMsg;
        this.NFCErrored = true;
        // this.stopScan();
      };

      this.isScanning = true;
    } catch (error) {
      this.startScan();
      this.error = 'Error occured!';
      console.log(error);
      this.NFCErrored = true;
      console.log({ error });
    }
  }

  stopScan() {
    this.abortController.abort();
    this.abortController = new AbortController();
    this.isScanning = false;
  }
}
