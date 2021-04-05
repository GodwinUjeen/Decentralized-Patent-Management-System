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
  uploadFile() {
    this.isUploading = 'uploading';
    this.uploadFileService
      .uploadFile(this.selectedFile[0])
      .then((hash) => {
        this.isUploading = 'uploaded';
        this.filePatentForm.value.documentHash = hash;
        this.snack.openInfoSnackBar('File Uploaded', 'ok');
      })
      .catch((error) => {
        this.snack.openErrorSnackBar(error.message, 'dismiss');
      });
  }
  filePatent() {
    this.patentFiling = true;
    this.filePatentService.createPatent(
      this.account,
      this.filePatentForm.value,
      (status: boolean) => {
        if (status) {
          this.filePatentForm.reset();
          this.selectedFile = null;
          this.patentFiling = false;
        } else {
          this.patentFiling = false;
        }
      }
    );
  }
}
