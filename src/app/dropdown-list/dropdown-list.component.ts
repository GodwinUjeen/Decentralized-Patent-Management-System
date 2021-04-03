import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PatentInteface } from '../models/patent.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverComponent } from '../dialog-over/dialog-over.component';
import { SharePatent } from '../models/share-patent.interface';
import { SharePatentService } from '../services/share-patent.service';
import { TransferPatentService } from '../services/transfer-patent.service';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  inputs: ['dataSource', 'userAccount'],
})
export class DropdownListComponent implements OnInit {
  dataSource: PatentInteface[] = [];
  userAccount: string = '';
  panelOpenState = false;
  tokenID: string = '';
  toAddress: string = '';
  columnsToDisplay = ['tokenID', 'tokenName', 'tokenSymbol'];
  expandedElement: PatentInteface | null = null;
  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private sharePatent: SharePatentService,
    private transferPatent: TransferPatentService
  ) {}
  openDialog(tokenId: any, mode: 'share' | 'transfer'): void {
    const dialogRef = this.dialog.open(DialogOverComponent, {
      width: '250px',
      data: { tokenID: tokenId, toAddress: this.toAddress, mode: mode },
    });

    dialogRef.afterClosed().subscribe((result: SharePatent) => {
      if (result) {
        if (mode === 'share') {
          this.sharePatent.sharePatent(
            this.userAccount,
            result.toAddress,
            result.tokenID
          );
        } else if (mode === 'transfer') {
          this.transferPatent.transferPatent(
            this.userAccount,
            result.toAddress,
            result.tokenID
          );
        }
      }
    });
  }
  ngOnInit(): void {
    this.changeDetectionRef.detectChanges();
  }
  
}
