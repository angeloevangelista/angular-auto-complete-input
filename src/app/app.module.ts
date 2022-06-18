import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const customModules = [SharedModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    ...customModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
