import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntryComponent } from './components/entry/entry.component';
import { ScannerRoutingModule } from './scanner-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    ScannerRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class ScannerModule {}
