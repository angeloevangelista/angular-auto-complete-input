import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

type CollectionType = Array<{ [key: string]: any }>;

interface AutoCompleteInputOptions {
  identifierKey: string;
  mainDisplayKey: string;
  validation: {
    errorKey: string;
    errorMessage: string;
  };

  invertDisplay?: boolean;
  secondaryDisplayKey?: string;
}

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
})
class AutoCompleteInputComponent implements OnInit {
  filteredCollection: Observable<CollectionType>;

  @Input() placeholder: string;
  @Input() collection: CollectionType = [];
  @Input() options: AutoCompleteInputOptions;
  @Input() abstractFormControl: AbstractControl<any, any>;

  get castAbstractControlAsFormControl(): FormControl {
    return this.abstractFormControl as FormControl;
  }

  ngOnInit(): void {
    this.filteredCollection = this.abstractFormControl.valueChanges.pipe(
      startWith(''),
      map((value) =>
        typeof value === 'string'
          ? value
          : this.getDisplayNameByIdentifier(value)
      ),
      map((name) => (name ? this.filter(name) : this.collection.slice()))
    );

    this.abstractFormControl.addValidators(this.validateStateValue.bind(this));
  }

  getDisplayNameByIdentifier(identifierKey: number): string {
    const foundState = this.collection.find(
      (state) => state[this.options.identifierKey] === identifierKey
    );

    if (!foundState) return '';

    if (!this.options.secondaryDisplayKey)
      return foundState[this.options.mainDisplayKey];

    const displayName = this.options.invertDisplay
      ? `${foundState[this.options.secondaryDisplayKey]} - ${
          foundState[this.options.mainDisplayKey]
        }`
      : `${foundState[this.options.mainDisplayKey]} - ${
          foundState[this.options.secondaryDisplayKey]
        }`;

    return displayName;
  }

  validateStateValue(control: AbstractControl): ValidationErrors | null {
    const { value } = control;

    if (!value) return null;

    const foundByCode = this.collection.find(
      (p) =>
        String(p[this.options.identifierKey]).toUpperCase() ===
        String(value).toUpperCase()
    );

    const foundByDisplay = this.collection.find(
      (state) =>
        state[this.options.mainDisplayKey].toUpperCase() ===
          String(value).toUpperCase() ||
        this.getDisplayNameByIdentifier(
          state[this.options.identifierKey]
        ).toUpperCase() === String(value).toUpperCase()
    );

    const foundState = foundByCode || foundByDisplay;

    if (foundState) {
      if (!foundByCode)
        this.abstractFormControl.setValue(
          foundState[this.options.identifierKey]
        );

      return null;
    }

    return {
      [this.options.validation.errorKey]: this.options.validation.errorMessage,
    };
  }

  private filter(value: string | number): any[] {
    const filterValue = String(value).toLowerCase();

    const filtered = this.collection.filter((state) =>
      this.getDisplayNameByIdentifier(state[this.options.identifierKey])
        .toLowerCase()
        .includes(filterValue)
    );

    return filtered;
  }
}

export { AutoCompleteInputComponent, AutoCompleteInputOptions };
