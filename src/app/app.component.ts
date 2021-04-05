import { Component } from '@angular/core';

import { TabItem } from './models/tab-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tabs: TabItem[] = [
    {
      label: 'Profile',
      icon: 'person',
      path: 'profile',
    },
    {
      label: 'Create Patent',
      icon: 'create',
      path: 'create-patent',
    },
    {
      label: 'Shared Patent',
      icon: 'share',
      path: 'shared',
    },
    {
      label: 'Transfered Patent',
      icon: 'transfer',
      path: 'transfered',
    },
  ];
}
