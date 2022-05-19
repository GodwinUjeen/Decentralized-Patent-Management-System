import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { EtherscanResponse } from '../models/etherscan-response';
import { MetamaskService } from '../services/metamask.service';
import { PatentUriService } from '../services/patent-uri.service';
import { TransferedPatentService } from '../services/transfered-patent.service';

@Component({
  selector: 'app-tokens-transfered',
  templateUrl: './tokens-transfered.component.html',
  styleUrls: ['./tokens-transfered.component.css'],
  providers: [MetamaskService, TransferedPatentService, PatentUriService],
})
export class TokensTransferedComponent implements OnInit {
  account: string = '';
  balance: any;
  Patents: any = [];
  dataIsLoading: boolean = true;
  changed: boolean = false;
  contract: string = '0x7e40600d3f52ccc62fb94187ac6decb8802c22f3';
  constructor(
    private metaMask: MetamaskService,
    private changeDetectionRef: ChangeDetectorRef,
    private transferedPatentService: TransferedPatentService,
    private patentUriService: PatentUriService
  ) {}

  ngOnInit(): void {
    this.metaMask.getAccount().then((val) => {
      this.account = val;
      this.getTransferedToken();
      this.changeDetectionRef.detectChanges();
    });
    this.metaMask.accountChange.subscribe((val) => {
      this.changed = true;
      this.account = val;
      this.getTransferedToken();
      this.changeDetectionRef.detectChanges();
    });
  }
  getTransferedToken() {
    this.transferedPatentService
      .getTransferedPatent(this.account)
      .subscribe((resp: { body: any }) => {
        const allTransaction: Array<EtherscanResponse> = resp.body.result;
        const validTransactions: Array<EtherscanResponse> = [];
        let currentList: Array<EtherscanResponse> = [];
        if (this.changed) {
          currentList = allTransaction.filter((val: EtherscanResponse) => {
            return (
              val.contractAddress === this.contract && val.from === this.account
            );
          });
        } else {
          currentList = allTransaction.filter(
            (transaction: EtherscanResponse) => {
              return (
                transaction.contractAddress === this.contract &&
                Web3.utils.toChecksumAddress(transaction.from) === this.account
              );
            }
          );
        }
        const unique = (value: any, index: any, self: any) => {
          return self.indexOf(value) === index;
        };
        const tokens = currentList
          .map((val: EtherscanResponse) => val.tokenID)
          .filter(unique);
        tokens
          .map((ins: any) =>
            currentList
              .map((el: EtherscanResponse) => el.tokenID)
              .lastIndexOf(ins)
          )
          .map((validIndexes: any) =>
            validTransactions.push(currentList[validIndexes])
          );
        const tempPatent: Array<EtherscanResponse> = [];
        validTransactions.map(async (val: EtherscanResponse, index: number) => {
          if (this.changed) {
            if (val.from === this.account) {
              const uri = await this.patentUriService
                .getURIData(val.tokenID, this.contract)
                .then((data: any) => {
                  return data;
                });
              val.uri = uri;
              tempPatent.push(val);
            }
          } else {
            if (Web3.utils.toChecksumAddress(val.from) === this.account) {
              const uri = await this.patentUriService
                .getURIData(val.tokenID, this.contract)
                .then((data: any) => {
                  return data;
                });
              val.uri = uri;
              tempPatent.push(val);
            }
          }
          this.changeDetectionRef.detectChanges();
        });
        this.Patents = tempPatent;
        this.changeDetectionRef.detectChanges();
        this.Patents = [
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Suvedha',
              description: 'Personalized recommendation engine using HADOOP',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Nivedha',
              description:
                'Study on predicting for workload of cloud services using Artificial Neural Network',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Rasika',
              description:
                'Multi-cloud policy enforcement through semantic modeling and mapping',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
        ];
        this.dataIsLoading = false;
      });
  }
}
