import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExampleFormControls } from './models/app.component.model';

import rawBrazilianStates from '../assets/json/brazil-states.json';
import { AutoCompleteInputOptions } from './shared/components/auto-complete-input/auto-complete-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  autoCompleteInputOptions: AutoCompleteInputOptions = {
    identifierKey: 'codigo',
    mainDisplayKey: 'nome',
    secondaryDisplayKey: 'sigla',
    invertDisplay: true,
    validation: {
      errorKey: 'invalidState',
      errorMessage: 'Escolha um item da lista.',
    },
  };

  exampleForm: FormGroup<ExampleFormControls>;
  brazilianStates: any[] = [];

  ngOnInit(): void {
    this.createForm();
    this.fetchStates();
  }

  private fetchStates() {
    this.brazilianStates = rawBrazilianStates;
  }

  private createForm() {
    this.exampleForm = new FormGroup<ExampleFormControls>({
      name: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }

  handleFormSubmission(): void {
    const {
      controls: {
        name: { value: name },
        state: stateCode,
      },
    } = this.exampleForm;

    const stateName = this.brazilianStates.find(
      (state) => state.codigo === stateCode.value
    ).nome;

    alert(`Boa, ${name}. Você escolheu ${stateName}!`);
  }
}
