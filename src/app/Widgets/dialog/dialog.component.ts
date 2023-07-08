import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DialogFormat } from 'src/app/Models/DialogFormat';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {} // @Inject(MAT_DIALOG_DATA) public data: DialogFormat // public dialogRef: MatDialogRef<DialogComponent>,

  ngOnInit(): void {}
  onYes() {
    this.clicked.emit(true);
    // this.dialogRef.close();
  }
  onNo() {
    this.clicked.emit(false);
    // this.dialogRef.close();
  }
}
