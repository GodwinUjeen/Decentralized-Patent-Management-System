import { Injectable } from '@angular/core';
import { Bee } from '@ethersphere/bee-js';
const bee = new Bee('https://gateway.ethswarm.org');
@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor() {}
  async uploadFile(fileDocument: File) {
    return await bee.uploadFile(fileDocument, fileDocument.name);
  }
}
