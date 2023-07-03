import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Nfc } from 'src/app/shared/model/nfc';
import { User } from 'src/app/shared/model/user';
import { ClientUserService } from 'src/app/shared/services/client-user.service';

@Component({
  selector: 'app-add-nfc-dialog',
  templateUrl: './add-nfc-dialog.component.html',
  styleUrls: ['./add-nfc-dialog.component.scss']
})
export class AddNfcDialogComponent {
  public dialogForm: FormGroup;
  public userOptions: User[] = [];
  private isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddNfcDialogComponent>,
    public clientUser: ClientUserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      user: ['', Validators.required],
      nfcFrom: ['', Validators.required],
      nfcTo: ['', Validators.required],
    });
  // Add a listener for the date range field

  /*this.dialogForm.get('dateRange')?.valueChanges.subscribe((dateRange) => {
    if (dateRange) {
      const [nfcFrom, nfcTo] = dateRange;
      console.log(dateRange);

      this.dialogForm.get('nfcFrom')?.setValue(nfcFrom);
      this.dialogForm.get('nfcTo')?.setValue(nfcTo);
    }
  });*/

    this.isUpdate = this.data.isUpdate;
    if (this.isUpdate) {
      this.dialogForm.get('serialNumber')?.setValue(this.data.nfc.serialNumber);
    }
   }

   onSubmit(): void {
      if (this.dialogForm.valid && this.isUpdate) {
        this.data.nfcCard.serialNumber = this.dialogForm.value.serialNumber;
        this.data.nfcCard.user = this.dialogForm.value.user;
        this.data.nfcCard.nfcFrom = this.dialogForm.value.nfcFrom;
        this.data.nfcCard.nfcTo = this.dialogForm.value.nfcTo;
        this.dialogRef.close(this.data);
      } else if (this.dialogForm.valid && !this.isUpdate) {
        this.data.nfcCard = new Nfc(this.dialogForm.value.serialNumber,this.dialogForm.value.nfcFrom,this.dialogForm.value.nfcTo,this.dialogForm.value.user);
        this.data.nfcCard.user = this.dialogForm.value.user;
        this.data.nfcCard.nfcFrom = this.dialogForm.value.nfcFrom;
        this.data.nfcCard.nfcTo = this.dialogForm.value.nfcTo;
        // Schließe den Dialog
        this.dialogRef.close(this.data);
      }
   }

   ngOnInit(): void {
    this.clientUser.getUsers().subscribe(
      (res: any) => this.userOptions = res.data,
      (err: any) => console.log(err)
    );
  }

}

