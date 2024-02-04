import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Material */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
/* Pipes */
import { FullNamePipePipe } from './pipes/full-name-pipe.pipe';
import { StudentIdParserPipe } from './pipes/student-id-parser.pipe';
/* Directive */
import { CabecerasDirective } from './directives/cabeceras.directive';

@NgModule({
  declarations: [
    /* Pipes */
    FullNamePipePipe,
    StudentIdParserPipe,
    /* Directives */
    CabecerasDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
  ],
  exports: [
    /* Module */
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    /* Pipes */
    FullNamePipePipe,
    StudentIdParserPipe,
    /* Directives */
    CabecerasDirective,
    MatSelectModule,
  ],
})
export class SharedModule {}
