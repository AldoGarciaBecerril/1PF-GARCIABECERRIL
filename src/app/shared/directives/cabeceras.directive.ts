import { Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCabeceras]'
})
export class CabecerasDirective {

  constructor(
    private elemntRef: ElementRef,
    private renderer: Renderer2
  )
  {
    this.renderer.setStyle(this.elemntRef.nativeElement, 'font-size', '20px')
   
  }

}
