import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RoutedComponents, ScannerRoutingModule} from './scanner-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [RoutedComponents],
    imports: [
        CommonModule,
        ScannerRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        SharedModule,
    ],
})
export class ScannerModule {}
