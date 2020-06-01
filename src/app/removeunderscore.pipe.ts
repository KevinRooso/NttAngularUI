import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeunderscore',
})
export class RemoveunderscorePipe implements PipeTransform {
  transform(value: any): any {
    return value.replace(/_/g, ' ');
  }
}
