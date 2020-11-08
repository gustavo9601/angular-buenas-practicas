import {Component, OnInit} from '@angular/core';
import {GeneratorDataService} from '../../../core/services/generator-data.service';
import {EmployeeData} from '../../../core/models/employee-data.model';


@Component({
  selector: 'app-layout-contact',
  templateUrl: './layout-contact.component.html',
  styleUrls: ['./layout-contact.component.scss']
})
export class LayoutContactComponent implements OnInit {

  list1: EmployeeData[];
  list2: EmployeeData[];

  constructor(private _generatorDataService: GeneratorDataService) {
    this.list1 = [];
    this.list2 = [];
  }

  ngOnInit(): void {
    const names = [
      'gustavo',
      'meliza',
      'cinthya',
      'martha'
    ];


    this.list1 = this._generatorDataService.generate(names, [20, 50], 5);
    this.list2 = this._generatorDataService.generate(names, [80, 120], 5);

  }

  receiveNewEmployeeData(typeList: EmployeeData[], $event) {
    // Pusheando en la primer posicion el arreglo
    typeList.unshift(
      {
        label: $event,
        num: this._generatorDataService.generateNumber([1, 1000])
      }
    );
  }

  removeItemEmployee(typeList: EmployeeData[], $event: number) {
    typeList.splice($event, 1);
  }

}
