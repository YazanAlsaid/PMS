import { Component } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  NFCErrored: boolean | undefined;
  error: string = '';

  async startScan() {
    if (!('NDEFReader' in window)) {
      const error = 'Web NFC not supported';
      this.error = error;
      this.NFCErrored = true;
      return console.log(error);
    }

    try {
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener('readingerror', () => {
        const error = "Couldn't read from NFC tag, try another one";
        this.error = error;
        this.NFCErrored = true;
        console.log(error);
      });

      ndef.addEventListener('reading', (e) => {
        console.log({ e });
      });
    } catch (error) {
      this.error = 'Error occured!';
      console.log(error);
      this.NFCErrored = true;
      console.log({ error });
    }
  }
}
