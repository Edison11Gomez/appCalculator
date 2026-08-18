import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import { CalcButton } from './calculator';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class HomePage {

  display: string = '0';
  operand: string = '';
  operator: string = '';
  function: string = '';

  buttons: CalcButton[] = [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '÷', value: '/', type: 'operator' },

    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '×', value: '*', type: 'operator' },

    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '-', value: '-', type: 'operator' },

    { label: '0', value: '0', type: 'number' },
    { label: '.', value: '.', type: 'action' },
    { label: '√', value: 'sqrt', type: 'action' },
    { label: '+', value: '+', type: 'operator' },

    { label: 'sin', value: 'sin', type: 'action' },
    { label: 'cos', value: 'cos', type: 'action' },
    { label: 'tan', value: 'tan', type: 'action' },
    { label: 'C', value: 'C', type: 'action' },

    { label: '=', value: '=', type: 'action' }
  ];

  onPress(btn: CalcButton) {

    if (btn.type === 'number') {

      this.display = this.display === '0'
        ? btn.value
        : this.display + btn.value;

    }

    else if (btn.value === '.') {

      if (!this.display.includes('.')) {
        this.display += '.';
      }

    }

    else if (btn.type === 'operator') {

      this.operand = this.display;
      this.operator = btn.value;
      this.display = '0';

    }

    else if (
      btn.value === 'sqrt' ||
      btn.value === 'sin' ||
      btn.value === 'cos' ||
      btn.value === 'tan'
    ) {

      this.function = btn.value;
      this.display = '0';

    }

    else if (btn.value === '=') {

      this.equal();

    }

    else if (btn.value === 'C') {

      this.display = '0';
      this.operand = '';
      this.operator = '';
      this.function = '';

    }
  }

  equal() {

    if (this.function !== '') {

      const numero = Number(this.display);

      if (this.function === 'sqrt') {

        if (numero < 0) {
          this.display = 'Error';
        } else {
          this.display = Math.sqrt(numero).toFixed(6);
        }

      }

      else if (this.function === 'sin') {

        this.display = Math.sin(
          numero * Math.PI / 180
        ).toFixed(6);

      }

      else if (this.function === 'cos') {

        this.display = Math.cos(
          numero * Math.PI / 180
        ).toFixed(6);

      }

      else if (this.function === 'tan') {

        this.display = Math.tan(
          numero * Math.PI / 180
        ).toFixed(6);

      }

      this.function = '';

      return;
    }

    const a = parseFloat(this.operand);
    const b = parseFloat(this.display);

    let result = 0;

    switch (this.operator) {

      case '+':

        result = a + b;

        break;

      case '-':

        result = a - b;

        break;

      case '*':

        result = a * b;

        break;

      case '/':

        if (b === 0) {

          this.display = 'Error';

          return;
        }

        result = a / b;

        break;
    }

    this.display = result.toString();

    this.operand = '';
    this.operator = '';
  }
}