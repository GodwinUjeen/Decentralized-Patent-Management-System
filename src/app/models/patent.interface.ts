export interface PatentInteface {
  tokenID: string;
  tokenName: string;
  hash: string;
  uri: {
    name: string;
    description: string;
    documentHash?: string;
  };
}
