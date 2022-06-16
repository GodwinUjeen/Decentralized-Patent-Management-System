import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patent } from '../models/patent';
import { CreatePatentService } from '../services/create-patent.service';
import { MetamaskService } from '../services/metamask.service';
import { SnackBarService } from '../services/snack-bar.service';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'app-create-patent',
  templateUrl: './create-patent.component.html',
  styleUrls: ['./create-patent.component.css'],
})
export class CreatePatentComponent implements OnInit {
  account: string = '';
  selectedFile: any;
  data: Patent = { name: '', description: '', documentHash: '' };
  filePatentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  fileSelected: boolean = true;
  isUploading: string = '';
  patentFiling: boolean = false;
  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private metaMask: MetamaskService,
    private uploadFileService: UploadFileService,
    private filePatentService: CreatePatentService,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.metaMask.getAccount().then((val) => {
      this.account = val;
    });
    this.metaMask.accountChange.subscribe((val) => {
      this.account = val;
      this.changeDetectionRef.detectChanges();
    });
  }
  selectFile(event: any) {
    this.selectedFile = event.target.files;
    this.fileSelected = false;
    this.changeDetectionRef.detectChanges();
  }
  uploadFile(): void {
    this.isUploading = 'uploading';
    // this.uploadFileService
    //   .uploadFile(this.selectedFile[0])
    //   .then((hash) => {
    //     this.isUploading = 'uploaded';
    //     this.filePatentForm.value.documentHash = hash;
    //     this.snack.openInfoSnackBar('File Uploaded', 'ok');
    //   })
    //   .catch((error) => {
    //     this.snack.openErrorSnackBar(error.message, 'dismiss');
    //   });

    setTimeout(() => {
      this.isUploading = 'uploaded';
      this.filePatentForm.value.documentHash =
        '4356789uhhjcxfdfaeQ3234567987YUGFXZVXC';
      this.snack.openInfoSnackBar('File Uploaded', 'ok');
    }, 5000);
  }
  filePatent(): void {
    this.patentFiling = true;
    // this.filePatentService.createPatent(
    //   this.account,
    //   this.filePatentForm.value,
    //   (status: boolean) => {
    //     if (status) {
    //       this.filePatentForm.reset();
    //       this.selectedFile = null;
    //       this.patentFiling = false;
    //     } else {
    //       this.patentFiling = false;
    //     }
    //   }
    // );
    setTimeout(() => {
      function byteToHex(byte: any) {
        return ('0' + byte.toString(16)).slice(-2);
      }

      function generateId(len = 40) {
        var arr = new Uint8Array(len / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, byteToHex).join('');
      }

      const tokenId = generateId();
      const hash = generateId(62);
      console.log(`0x${tokenId}`, hash);

      let createdPatents = localStorage.getItem('createdPatents');
      if (createdPatents) {
        const data = JSON.parse(createdPatents);
        console.log(data);

        data.push({
          tokenID: `0x${tokenId}`,
          tokenName: 'Ethereum',
          hash: hash,
          uri: {
            name: this.filePatentForm.controls['name'].value,
            description: this.filePatentForm.controls['description'].value,
            documentHash:
              'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
          },
        });
        localStorage.setItem('createdPatents', JSON.stringify(data));
      } else {
        localStorage.setItem(
          'createdPatents',
          JSON.stringify([
            {
              tokenID: tokenId,
              tokenName: 'Ethereum',
              hash: hash,
              uri: {
                name: this.filePatentForm.controls['name'].value,
                description: this.filePatentForm.controls['description'].value,
                documentHash:
                  'a9a0017f54ad2f6b4c412ce3af8870cede5c63c49f4a45906138bed11f918748',
              },
            },
          ])
        );
      }

      this.filePatentForm.reset();
      this.isUploading = '';
      this.selectedFile = null;
      this.patentFiling = false;
      this.snack.openSnackBar(
        'Patent Filing Started',
        'View',
        '4356789uhhjcxfdfaeQ3234567987YUGFXZVXC'
      );
    }, 2000);
  }
}
