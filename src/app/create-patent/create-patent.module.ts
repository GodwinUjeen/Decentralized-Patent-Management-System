import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreatePatentComponent } from './create-patent.component';

@NgModule({
  declarations: [CreatePatentComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTooltipModule,
    RouterModule.forChild([{ path: '', component: CreatePatentComponent }]),
  ],
})
export class CreatePatentModule {}
