import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removehyphens',
})
export class RemovehyphensPipe implements PipeTransform {
  transform(value: any): any {
    return value.replace(/-/g, ' ');
  }
}
