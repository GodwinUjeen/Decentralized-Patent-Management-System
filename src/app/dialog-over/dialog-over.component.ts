import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharePatent } from '../models/share-patent.interface';

@Component({
  selector: 'app-dialog-over',
  templateUrl: './dialog-over.component.html',
  styleUrls: ['./dialog-over.component.css'],
})
export class DialogOverComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SharePatent
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
