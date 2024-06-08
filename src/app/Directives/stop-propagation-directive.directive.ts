import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagationDirective]',
})
export class StopPropagationDirectiveDirective {

  constructor() { }


  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}
