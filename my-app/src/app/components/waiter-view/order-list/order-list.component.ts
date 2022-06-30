import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() product : any[]

  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
  }

}
