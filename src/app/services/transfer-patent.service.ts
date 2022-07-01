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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
@Injectable({
  providedIn: 'root',
})
export class TransferPatentService {
  constructor(private snack: SnackBarService) {}
  async transferPatent(
    fromAddress: string,
    toAddress: string,
    tokenID: string
  ) {
    const contract = new new Web3(window.ethereum).eth.Contract(
      minABI,
      patentContract
    );
    contract.methods
      .safeTransferFrom(fromAddress, toAddress, tokenID)
      .send({ from: fromAddress })
      .on('transactionHash', (hash: any) => {
        this.snack.openSnackBar('Transfer Started', 'ok', hash);
      })
      .then((done: any) => {
        this.snack.openInfoSnackBar('Transfer Successfull', 'ok');
      });
  }
}
