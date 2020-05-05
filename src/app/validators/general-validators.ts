import { AbstractControl } from '@angular/forms';

export function textValidation(control: AbstractControl): { [key: string]: boolean } | null {
  let rText = control.value.replace(/<(.|\n)*?>/g, '');
  rText = rText.replace(/&nbsp;/g, '');
  rText = rText.replace(/\n/g, '');
  rText = rText.trim();
  if (rText.length >= 81) {
    // return {'rTextValid':true};
  }
  return null;
}
