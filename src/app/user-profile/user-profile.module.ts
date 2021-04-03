import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [UserProfileComponent, DropdownListComponent],
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
    RouterModule.forChild([{ path: '', component: UserProfileComponent }]),
  ],
})
export class UserProfileModule implements OnInit {
  ngOnInit(): void {}
}
