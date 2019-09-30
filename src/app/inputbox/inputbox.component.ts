import {Component, Inject, OnInit, ViewEncapsulation, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.scss']
})
export class InputboxComponent implements OnInit {

  form: FormGroup;
    description:string;

    constructor(
        private fb: FormBuilder,
         @Optional() public dialogRef: MatDialogRef<InputboxComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) {description} ) {

        this.description = description;


        this.form = fb.group({
            description: [description, Validators.required]
        });

    }

    ngOnInit() {

    }


    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}
