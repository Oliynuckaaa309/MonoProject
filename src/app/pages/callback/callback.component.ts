import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.sass'
})
export class CallbackComponent {
  constructor(public dialog:MatDialog){}
  closeModal(){
this.dialog.closeAll();
  }
}
