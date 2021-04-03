import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let require: any;
declare let window: any;
const minABI: any = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class PatentUriService {
  constructor() {}
  async getURIData(tokenId: any, contractAddress: any) {
    const uriContract = new new Web3(window.ethereum).eth.Contract(
      minABI,
      contractAddress
    );
    let detail = await uriContract.methods.tokenURI(tokenId).call();
    const addTokenId = JSON.parse(detail);
    detail = JSON.stringify(addTokenId);
    return addTokenId;
  }
}
