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
  dataIsLoading: boolean = true;
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
        this.Patents.push({
          tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
          tokenName: 'Ethereum',
          hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
          uri: {
            name: 'Gokul',
            description: 'This is a sample trail transaction',
            documentHash:
              'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
          },
        });

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
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Ajith',
              description:
                'CaNViS: A cardiac and neurological-based verification system that uses wearable sensors',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Godwin',
              description:
                'A comparison of features for automatic deception detection in synchronous computer-mediated communication',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Yazhini',
              description:
                'Applicability of Probablistic Data Structures for Filtering Tasks in Data Loss Prevention Systems',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Akash',
              description:
                'A goal-based approach for automated specification of Information Quality policies',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
          {
            tokenID: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
            tokenName: 'Ethereum',
            hash: '3c291e2bccff12d1dca4a5ce6428626b84c1a8cf09e173c98949f22e22d3d2e8',
            uri: {
              name: 'Opponent',
              description:
                'Implementation of Trust and Reputation Management for Free-Roaming Mobile Agent Security',
              documentHash:
                'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
            },
          },
        ];
        this.dataIsLoading = false;
      });
  }
}
