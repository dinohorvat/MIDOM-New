import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {StudyOwnerModel} from '../../../shared/models/consultation-request.model';
import {StudyModel} from '../../../shared/models/study.model';

@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
  public itemForm: FormGroup;

    study: StudyModel = new StudyModel();
    studyOwner: StudyOwnerModel = new StudyOwnerModel();
    activeCr: any;
    constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.study = this.data.payload;
    this.studyOwner = this.data.payload.studyOwner;
    this.activeCr = this.data.activeCr;
    this.buildItemForm(this.data.payload);
      console.log(this.data.payload);
  }


  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      age: [item.age || ''],
      email: [item.email || ''],
      company: [item.company || ''],
      phone: [item.phone || ''],
      address: [item.address || ''],
      balance: [item.balance || ''],
      isActive: [item.isActive || false]
    })
  }

  close() {
    this.dialogRef.close(this.itemForm.value)
  }
}
