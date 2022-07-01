import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import Web3 from 'web3';

import { EtherscanResponse } from '../models/etherscan-response';
import { MetamaskService } from '../services/metamask.service';
import { PatentUriService } from '../services/patent-uri.service';
import { SharedPatentService } from '../services/shared-patent.service';

declare let window: any;

@Component({
  selector: 'app-tokens-shared',
  templateUrl: './tokens-shared.component.html',
  styleUrls: ['./tokens-shared.component.css'],
  providers: [MetamaskService, SharedPatentService, PatentUriService],
})
export class TokensSharedComponent implements OnInit {
  account: string = '';
  dataIsLoading: boolean = true;
  patentsSharedFrom: Array<EtherscanResponse> = [];
  patentsSharedTo: Array<EtherscanResponse> = [];
  changed: boolean = false;
  contract: string = '0x7e40600d3f52ccc62fb94187ac6decb8802c22f3';

  constructor(
    private metaMask: MetamaskService,
    private changeDetectionRef: ChangeDetectorRef,
    private sharedPatentService: SharedPatentService,
    private patentUriService: PatentUriService
  ) {}

  ngOnInit(): void {
    this.metaMask.getAccount().then((val) => {
      this.account = val;
      this.getTokensShared();
      this.changeDetectionRef.detectChanges();
    });
    this.metaMask.accountChange.subscribe((val) => {
      this.changed = true;
      this.account = val;
      this.getTokensShared();
      this.changeDetectionRef.detectChanges();
    });
  }

  getTokensShared() {
    this.sharedPatentService
      .getSharedPatents()
      .subscribe((resp: { body: any }) => {
        const allShares: any = resp.body.result;
        allShares.map(async (data: any, index: number) => {
          const list = {} as EtherscanResponse;
          const tokenID = Web3.utils.hexToNumber(data.data);
          const uri = await this.patentUriService.getURIData(
            tokenID,
            this.contract
          );
          list.uri = uri;
          list.tokenID = tokenID.toString();
          list.from = this.convertAddress(data.topics[1]);
          list.to = this.convertAddress(data.topics[2]);
          list.hash = data.transactionHash;
          list.tokenName = 'FilePatent';
          list.tokenSymbol = 'FTP';
          if (list.to === this.account) {
            this.patentsSharedFrom.push(list);
          } else if (list.from === this.account) {
            this.patentsSharedTo.push(list);
          }
        });
        this.dataIsLoading = false;
      });
  }
  convertAddress(hexAddress: string): any {
    return new Web3(window.ethereum).eth.abi.decodeParameter(
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      hexAddress
    );
  }
}
