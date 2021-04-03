import { Injectable, EventEmitter } from '@angular/core';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  private account: any = null;
  private readonly web3: any;
  private enable: any;
  accountChange = new EventEmitter();
  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== undefined) {
        this.web3 = window.web3.currentProvider;
      }
    }
    window.web3 = new Web3(window.ethereum);
    this.enableMetaMaskAccount();
    window.ethereum.on('accountsChanged', async (accounts: any) => {
      this.accountChange.emit(accounts[0]);
    });
  }
  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }
  async getAccount(): Promise<any> {
    if (this.account == null) {
      this.account = (await new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((err: Error, retAccount: any) => {
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      })) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }
  async getBalance(account: any): Promise<any> {

    return Promise.resolve(
      parseFloat(
        Web3.utils.fromWei(
          await window.web3.eth.getBalance(account),
          'ether'
        )
      ).toFixed(4)
    );
  }
}
