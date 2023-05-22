import { Component } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  checkNFCSupport() {
    if (!('NDEFReader' in window)) {
      return console.log('Web NFC not supported');
    }
  }

  async startScan() {
    this.checkNFCSupport();

    try {
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener('readingerror', () => {
        console.log("Couldn't read from NFC tag, try another one");
      });

      ndef.addEventListener('reading', (e) => {
        console.log({ e });
      });
    } catch (error) {
      console.log('Error occured!');
      console.log({ error });
    }
  }
}
