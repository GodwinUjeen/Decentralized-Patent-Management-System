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
        this.patentsSharedFrom = [
          {
            contractAddress: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            from: 'Godwin',
            to: 'Gokul',
            tokenID: '0x98ee4780be8f1beae1dcbd21cb787d36fe596366',
            tokenName: 'Ethereum',
            tokenSymbol: 'ETH',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'A goal-based approach for automated specification of Information Quality policies',
              description:
                'A goal-based approach for automated specification of Information Quality policies',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            contractAddress: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            from: 'Godwin',
            to: 'Gokul',
            tokenID: '0x283af0b28c62c092c9727ytQe09c02ca627eb7f7',
            tokenName: 'Ethereum',
            tokenSymbol: 'ETH',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Applicability of Probablistic Data Structures for Filtering Tasks in Data Loss Prevention Systems',
              description:
                'Applicability of Probablistic Data Structures for Filtering Tasks in Data Loss Prevention Systems',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            contractAddress: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            from: 'Ajith',
            to: 'Gokul',
            tokenID: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
            tokenName: 'Ethereum',
            tokenSymbol: 'ETH',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'CaNViS: A cardiac and neurological-based verification system that uses wearable sensors',
              description:
                'CaNViS: A cardiac and neurological-based verification system that uses wearable sensors',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
        ];
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
