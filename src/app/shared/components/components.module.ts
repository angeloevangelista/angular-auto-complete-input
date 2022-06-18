import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoCompleteInputComponent } from './auto-complete-input/auto-complete-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AutoCompleteInputComponent],
  exports: [AutoCompleteInputComponent],
})
class ComponentsModule {}

export { ComponentsModule };
