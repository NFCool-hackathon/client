import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-display-success',
  templateUrl: './display-success.component.html',
  styleUrls: ['./display-success.component.scss']
})
export class DisplaySuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string}) { }

  ngOnInit(): void {
  }

}
