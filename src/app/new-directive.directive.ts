import { Directive } from '@angular/core';

@Directive({
    selector: '[appNewDirective]',
    standalone: false
})
export class NewDirectiveDirective {

  constructor() { }

}
