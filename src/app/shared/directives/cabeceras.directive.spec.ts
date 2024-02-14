import { CabecerasDirective } from './cabeceras.directive';
import { Renderer2, ElementRef } from '@angular/core';
describe('CabecerasDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('div') };
    const rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle']);
    const directive = new CabecerasDirective(
      elementRefMock as ElementRef,
      rendererMock as Renderer2
    );
    expect(directive).toBeTruthy();
  });
});
