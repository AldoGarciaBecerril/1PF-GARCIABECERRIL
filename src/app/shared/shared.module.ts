import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipePipe } from './pipes/full-name-pipe.pipe';
import { CabecerasDirective } from './directives/cabeceras.directive';



@NgModule({
  declarations: [
    FullNamePipePipe,
    CabecerasDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[FullNamePipePipe, CabecerasDirective]
})
export class SharedModule { }
