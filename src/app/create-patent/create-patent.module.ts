import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePatentComponent } from './create-patent.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CreatePatentComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: CreatePatentComponent }]),
  ],
})
export class CreatePatentModule {}
