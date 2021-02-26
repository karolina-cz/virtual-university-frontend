import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JSDocTagName} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  myForm: FormGroup;
  submitClicked = false;
  weekdays = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  constructor(public dialogRef: MatDialogRef<EventFormComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public formData: any) { }

  ngOnInit(): void {
    const defaultEnd = new Date();
    defaultEnd.setHours(defaultEnd.getHours() + 2);
    const isRecurring = this.formData.event?.frequency !== undefined && this.formData.event?.frequency !== null;
    let start;
    let end;
    let freq;
    if (!this.formData.isEditingMode){
      start = new Date();
      end = defaultEnd;
      freq = 'Daily';
    } else if (isRecurring){
      start = this.formData.event.recurringEventStart;
      end = this.formData.event.recurringEventEnd;
      freq = this.formData.event.frequency;
    } else {
      start = this.formData.event.start;
      end = this.formData.event.end;
      freq = 'Daily';
    }
    this.myForm = this.formBuilder.group({
      title: [this.formData.event?.title, [
        Validators.required
      ]],
      description: [this.formData.event?.description],
      startDateTime: [start, [
        Validators.required
      ]],
      endDateTime: [end, [
        Validators.required
      ]],
      isRecurring: [isRecurring],
      startDateRecurring: [start],
      endDateRecurring: [end],
      startTimeRecurring: [start],
      endTimeRecurring: [end],
      frequency: [freq]
    });
  }

  get title() {
    return this.myForm.get('title');
  }

  get description() {
    return this.myForm.get('description');
  }

  get endDateTime() {
    return this.myForm.get('endDateTime');
  }

  get startDateRecurring() {
    return this.myForm.get('startDateRecurring');
  }

  get endDateRecurring() {
    return this.myForm.get('endDateRecurring');
  }

  get startTimeRecurring() {
    return this.myForm.get('startTimeRecurring');
  }

  get endTimeRecurring() {
    return this.myForm.get('endTimeRecurring');
  }

  getWeekday(){
    return this.weekdays[this.startDateRecurring.value?.getDay()];
  }

  get startDateTime() {
    return this.myForm.get('startDateTime');
  }

  get isRecurring() {
    return this.myForm.get('isRecurring');
  }

  get frequency() {
    return this.myForm.get('frequency');
  }

  enableAllDates(){
    return true;
  }

  onSubmitClicked(){
    this.submitClicked = true;
    if (this.myForm.valid){
      let frequency = null;
      let start = this.startDateTime.value;
      let end = this.endDateTime.value;
      if (this.isRecurring.value){
        frequency = this.frequency.value;
        start = this.startDateRecurring.value;
        start.setHours(this.startTimeRecurring.value.getHours(),
          this.startTimeRecurring.value.getMinutes());
        end = this.endDateRecurring.value;
        end.setHours(this.endTimeRecurring.value.getHours(),
          this.endTimeRecurring.value.getMinutes());
      }
      this.dialogRef.close({
          title: this.title.value,
          description: this.description.value,
          end,
          start,
          frequency
        });
    }
  }
}
