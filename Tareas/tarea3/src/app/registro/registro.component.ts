import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { matchFields } from './validators';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    age: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(18)] }),
    password: this.fb.control('', { validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: this.fb.control('', { validators: [Validators.required, Validators.minLength(8)] }),
    terms: this.fb.control(false, { validators: [Validators.requiredTrue] })
  }, {
    validators: [matchFields('password', 'confirmPassword')]
  });

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('Formulario inválido, corrige los errores.');
      return;
    }
    console.log('Datos de registro:', this.form.value);
    
  }
}