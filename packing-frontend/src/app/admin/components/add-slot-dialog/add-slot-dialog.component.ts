import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-slot-dialog',
  templateUrl: './add-slot-dialog.component.html',
  styleUrls: ['./add-slot-dialog.component.scss']
})
export class AddSlotDialogComponent {
  parkings = ['Park 1', 'Park 2', 'Park 3'];
  buildings = ['Building 1', 'Building 2', 'Building 3'];
  floors = ['Floor 1', 'Floor 2', 'Floor 3'];
  types = ['Normal', 'Frauen', 'E-Auto', 'Behinderte'];

  selectedParking!: string;
  selectedBuilding!: string;
  selectedFloor!: string;
  name!: string;
  selectedType!: string;

  constructor(public dialogRef: MatDialogRef<AddSlotDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const newParking = {
      park: this.selectedParking,
      building: this.selectedBuilding,
      floor: this.selectedFloor,
      name: this.name,
      type: this.selectedType
    };

    this.dialogRef.close(newParking);
  }
}
