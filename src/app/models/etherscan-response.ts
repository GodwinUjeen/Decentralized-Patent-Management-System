export interface EtherscanResponse {
  contractAddress: string;
  from: string;
  to: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
  hash: string;
  uri: {
    name: string;
    description: string;
    documentHash: string;
  };
}
