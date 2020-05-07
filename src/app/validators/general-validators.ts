import { ValidatorFn, FormControl } from '@angular/forms';

export function textValidation(lengthSize: number): ValidatorFn {
  return (control: FormControl): { [key: string]: boolean } | null => {
    let rText = control.value.replace(/<(.|\n)*?>/g, '');
    rText = rText.replace(/&nbsp;/g, '');
    rText = rText.replace(/\n/g, '');
    rText = rText.trim();
    if (rText.length >= lengthSize + 1) {
      return { rTextValid: true };
    }
    return null;
  };
}
