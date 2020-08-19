import {Directive, ElementRef, Renderer2, HostListener} from '@angular/core';

@Directive({
  selector: '[appImgHover]'
})
export class ImgHoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2){}

  @HostListener('mouseenter') onMouseEnter() {
    this.setVisibility('visible');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setVisibility('hidden');
  }

  private setVisibility(val: string) {
    this.renderer.setStyle(this.element.nativeElement.childNodes[1], 'visibility', val);
  }
}
