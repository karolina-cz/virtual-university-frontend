import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayofweek'
})
export class DayofweekPipe implements PipeTransform {
  weekdays = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

  transform(value: Date): string {
    return this.weekdays[value.getDay()];
  }

}
