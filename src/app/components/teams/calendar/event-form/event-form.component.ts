import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  myForm: FormGroup;
  submitClicked = false;
  constructor(public dialogRef: MatDialogRef<EventFormComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public formData: any) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      title: [this.formData.event?.title, [
        Validators.required
      ]],
      description: [this.formData.event?.description],
      startDate: [this.formData.event?.start, [
        Validators.required
      ]],
      endDate: [this.formData.event?.end, [
        Validators.required
      ]]
    });
  }

  get title() {
    return this.myForm.get('title');
  }

  get description() {
    return this.myForm.get('description');
  }

  get endDate() {
    return this.myForm.get('endDate');
  }

  get startDate() {
    return this.myForm.get('startDate');
  }

  enableAllDates(){
    return true;
  }

  onSubmitClicked(){
    this.submitClicked = true;
    if (this.myForm.valid){
        this.dialogRef.close({
          title: this.title.value,
          description: this.description.value,
          end: this.endDate.value,
          start: this.startDate.value
        });
    }
  }
}
