import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventFreq'
})
export class EventFreqPipe implements PipeTransform {

  transform(value: string): string {
    switch (value){
      case 'Daily':
        return 'Codziennie';
      case 'Weekly':
        return 'Co tydzień';
      case 'Monthly':
        return 'Co miesiąc';
    }
  }

}
