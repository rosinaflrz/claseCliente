import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const matchFields = (field: string, confirmField: string): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const fg = group as FormGroup;
    const a = fg.get(field);
    const b = fg.get(confirmField);

    if (!a || !b) return null;

    const mismatch = a.value !== b.value;
    if (mismatch) {
      b.setErrors({ ...(b.errors || {}), passwordMismatch: true });
    } else {
      if (b.errors) {
        const { passwordMismatch, ...rest } = b.errors;
        b.setErrors(Object.keys(rest).length ? rest : null);
      }
    }
    return mismatch ? { passwordMismatch: true } : null;
  };
};