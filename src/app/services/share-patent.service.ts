import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { SnackBarService } from './snack-bar.service';

declare let require: any;
declare let window: any;
const patentContract = '0x7e40600d3f52ccc62fb94187ac6decb8802c22f3';
const minABI: any = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'sharePatent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

@Injectable({
  providedIn: 'root',
})
export class SharePatentService {
  constructor(private snack: SnackBarService) {}
  async sharePatent(fromAddress: string, toAddress: string, tokenId: string) {
    const contract = new new Web3(window.ethereum).eth.Contract(
      minABI,
      '0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F'
    );
    contract.methods
      .sharePatent(toAddress, patentContract, tokenId)
      .send({ from: fromAddress })
      .on('transactionHash', (hash: any) => {
        this.snack.openSnackBar('Sharing Started', 'ok', hash);
      })
      .then((done: any) => {
        this.snack.openInfoSnackBar('Sharing Successfull', 'ok');
      });
  }
}
