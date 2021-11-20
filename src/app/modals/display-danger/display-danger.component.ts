import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-display-danger',
  templateUrl: './display-danger.component.html',
  styleUrls: ['./display-danger.component.scss']
})
export class DisplayDangerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string}) { }

  ngOnInit(): void {
  }

}
