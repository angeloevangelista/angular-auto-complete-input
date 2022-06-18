import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteInputComponent } from './auto-complete-input/auto-complete-input.component';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  declarations: [AutoCompleteInputComponent],
  exports: [AutoCompleteInputComponent],
})
class ComponentsModule {}

export { ComponentsModule };
