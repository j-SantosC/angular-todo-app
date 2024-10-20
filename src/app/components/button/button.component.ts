import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
})
export class ButtonComponent implements OnInit {
  @Input() color!: string;
  @Output() click = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
