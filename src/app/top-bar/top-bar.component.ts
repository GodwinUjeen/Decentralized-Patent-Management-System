import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [MetamaskService],
})
export class TopBarComponent implements OnInit {
  account: any = '';
  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private metaMask: MetamaskService
  ) {}

  ngOnInit(): void {
    this.metaMask.getAccount().then((val) => {
      this.account = val;
    });
    this.metaMask.accountChange.subscribe((val) => {
      this.account = val;
      this.changeDetectionRef.detectChanges();
    });
  }
}
