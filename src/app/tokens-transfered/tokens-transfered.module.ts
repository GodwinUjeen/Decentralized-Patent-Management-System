import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TokensTransferedComponent } from './tokens-transfered.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DropdownListModule } from '../dropdown-list/dropdown-list.module';

@NgModule({
  declarations: [TokensTransferedComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    DropdownListModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: TokensTransferedComponent }]),
  ],
})
export class TokensTransferedModule {}
