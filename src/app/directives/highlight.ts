import { Directive, ElementRef, Host, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  private el = inject(ElementRef);

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.boxShadow = '5px 4px 12px rgba(199, 81, 81, 0.12)';
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.boxShadow = 'none';
  }
}
