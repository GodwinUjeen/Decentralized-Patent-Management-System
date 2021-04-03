import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { MetamaskService } from '../services/metamask.service';
import { PatentHoldingService } from '../services/patent-holding.service';
import { PatentUriService } from '../services/patent-uri.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [MetamaskService, PatentHoldingService, PatentUriService],
})
export class UserProfileComponent implements OnInit {
  account: any;
  balance: any;
  Patents: any = [];
  changed: boolean = false;
  contract: string = '0x7e40600d3f52ccc62fb94187ac6decb8802c22f3';
  constructor(
    private metaMask: MetamaskService,
    private changeDetectionRef: ChangeDetectorRef,
    private patentHoldingService: PatentHoldingService,
    private patentUriService: PatentUriService
  ) {}

  ngOnInit(): void {
    this.metaMask.getAccount().then((val) => {
      this.account = val;
      this.metaMask.getBalance(val).then((bal) => {
        this.balance = bal;
      });
      this.getHoldingToken();
      this.changeDetectionRef.detectChanges();
    });
    this.metaMask.accountChange.subscribe((val) => {
      // this.Patents = [];
      this.changed = true;
      this.account = val;
      this.metaMask.getBalance(val).then((bal) => {
        this.balance = bal;
        this.changeDetectionRef.detectChanges();
      });
      this.getHoldingToken();
      this.changeDetectionRef.detectChanges();
    });
  }
  getHoldingToken() {
    this.patentHoldingService
      .getOwnedPatent(this.account)
      .subscribe((resp: { body: any }) => {
        const allTransaction = resp.body.result;
        const validList: any = [];
        let currentList: any = [];
        if (this.changed) {
          allTransaction.map((val: any) => {
            if (
              val.contractAddress === this.contract &&
              (val.to === this.account || val.from === this.account)
            ) {
              currentList.push(val);
            }
          });
        } else {
          currentList = allTransaction.filter((transaction: any) => {
            return (
              transaction.contractAddress === this.contract &&
              (Web3.utils.toChecksumAddress(transaction.to) === this.account ||
                Web3.utils.toChecksumAddress(transaction.from) === this.account)
            );
          });
        }
        const unique = (value: any, index: any, self: any) => {
          return self.indexOf(value) === index;
        };
        const tokens = currentList
          .map((val: any) => val.tokenID)
          .filter(unique);
        tokens
          .map((ins: any) =>
            currentList.map((el: any) => el.tokenID).lastIndexOf(ins)
          )
          .map((validIndexes: any) =>
            validList.push(currentList[validIndexes])
          );
        const tempPatent: any = [];
        validList.map(async (val: any, index: any) => {
          if (this.changed) {
            if (val.to === this.account) {
              const uri = await this.patentUriService
                .getURIData(val.tokenID, this.contract)
                .then((data: any) => {
                  return data;
                });
              val.uri = uri;
              tempPatent.push(val);
            }
          } else {
            if (Web3.utils.toChecksumAddress(val.to) === this.account) {
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
      });
  }
}
