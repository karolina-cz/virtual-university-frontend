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
  weekdays = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  constructor(public dialogRef: MatDialogRef<EventFormComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public formData: any) { }

  ngOnInit(): void {
    const defaultEnd = new Date();
    const isRecurring = this.formData.event?.frequency !== undefined && this.formData.event?.frequency !== null;
    const start = this.formData.event?.start === undefined ? new Date() : this.formData.event.start;
    defaultEnd.setHours(defaultEnd.getHours() + 2);
    const end = this.formData.event?.end === undefined ? defaultEnd : this.formData.event.end;

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
      endTime: [],
      frequency: [this.formData.event?.frequency]
    });
  }

  get title() {
    return this.myForm.get('title');
  }

  display() {
    console.log(this.myForm.get('endTime').value);
  }

  get description() {
    return this.myForm.get('description');
  }

  get endDateTime() {
    return this.myForm.get('endDateTime');
  }

  getWeekday(){
    return this.weekdays[this.startDateTime.value?.getDay()];
  }

  getEventHours(){
    return '' + this.getTimeFormat(this.startDateTime.value) + ' - ' + this.getTimeFormat(this.endDateTime.value);
  }

  getTimeFormat(date){
    if (date === null) { return ''; }
    const hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    return hours + ':' + minutes;
  }

  getMonthDay(){
    return this.startDateTime.value?.getDate();
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
      const frequency = this.isRecurring.value ? this.frequency.value : null;
      this.dialogRef.close({
          title: this.title.value,
          description: this.description.value,
          end: this.endDateTime.value,
          start: this.startDateTime.value,
          frequency
        });
    }
  }
}
