import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class Tooltip {
  private el = inject(ElementRef);

  @Input() appTooltip: string = '';

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.setAttribute('title', this.appTooltip);
  }
}