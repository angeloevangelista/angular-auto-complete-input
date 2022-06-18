import { AbstractControl } from '@angular/forms';

interface ExampleFormProperties {
  name: string;
  state: unknown;
}

type ExampleFormControls = {
  [key in keyof ExampleFormProperties]: AbstractControl;
};

interface BrazilianState {
  id_uf: number;
  sigla: string;
  nome: string;
  codigo: number;
  id_pais: number;
}

export { ExampleFormControls, BrazilianState };
