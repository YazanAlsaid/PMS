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
    data: DataView | undefined;
  }[] = [];
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
        console.log(event.message.records[0].data);

        this.readCards.push({
          serialNumber: event.serialNumber,
          data: event.message.records[0].data,
        });
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
