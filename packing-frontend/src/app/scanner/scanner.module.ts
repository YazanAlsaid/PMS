import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScannerRoutingModule } from './scanner-routing.module';
import { EntryComponent } from './components/entry/entry.component';

@NgModule({
  declarations: [EntryComponent],
  imports: [CommonModule, ScannerRoutingModule],
})
export class ScannerModule {}
