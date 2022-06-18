import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';

import {
  BrazilianState,
  ExampleFormControls,
} from './models/app.component.model';

import rawBrazilianStates from '../assets/json/brazil-states.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  exampleForm: FormGroup<ExampleFormControls>;
  brazilianStates: BrazilianState[] = [];
  filteredBrazilianStates: Observable<BrazilianState[]>;

  ngOnInit(): void {
    this.createForm();
    this.fetchStates();

    this.filteredBrazilianStates =
      this.exampleForm.controls.state.valueChanges.pipe(
        startWith(''),
        map((value) =>
          typeof value === 'string' ? value : this.getStateByCode(value)
        ),
        map((name) =>
          name ? this._filter(name) : this.brazilianStates.slice()
        )
      );
  }

  private fetchStates() {
    this.brazilianStates = rawBrazilianStates;
  }

  private createForm() {
    this.exampleForm = new FormGroup<ExampleFormControls>({
      name: new FormControl(''),
      state: new FormControl('', [
        (control) => this.validateStateValue(control),
      ]),
    });
  }

  validateStateValue(control: AbstractControl): ValidationErrors | null {
    const { value } = control;

    const foundByCode = this.brazilianStates.find(
      (p) => String(p.codigo).toUpperCase() === String(value).toUpperCase()
    );

    const foundByDisplay = this.brazilianStates.find(
      (p) => String(p.nome).toUpperCase() === String(value).toUpperCase()
    );

    const foundState = foundByCode || foundByDisplay;

    if (foundState) {
      if (!foundByCode)
        this.exampleForm.controls.state.setValue(foundState.codigo);

      return null;
    }

    return {
      invalidState: 'Escolha um estado da lista.',
    };
  }

  handleConsolePrint(): void {
    console.log(this.exampleForm.value);
  }

  private _filter(value: string | number): BrazilianState[] {
    const filterValue = String(value).toLowerCase();

    const filtered = this.brazilianStates.filter((state) =>
      state.nome.toLowerCase().includes(filterValue)
    );

    return filtered;
  }

  displayFunction(codigo: number): string {
    const foundState = (this.brazilianStates || []).find(
      (state) => state.codigo === codigo
    );

    return foundState ? foundState.nome : '';
  }

  getStateByCode(codigo: number): string {
    const foundState = this.brazilianStates.find(
      (state) => state.codigo === codigo
    );

    return foundState ? foundState.nome : '';
  }
}
