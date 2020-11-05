import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeData} from '../../../core/models/employee-data.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // De esta forma aplicara la estrategia para aplicar detectar unicamente los cambios en la instancia en que se ejecute la llamada al componente
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input('title') title;
  @Input('employessData') employessData: EmployeeData[];
  @Output('newLabelEmployee') newLabelEmployee = new EventEmitter<string>();
  @Output('removeItemEmployee') idRemoveEmployee = new EventEmitter<number>();
  label: string;

  constructor() {
    this.label = '';
    this.employessData = [];
  }

  ngOnInit(): void {
  }

  addItem() {
    // Le emitimos un nuevo label
    this.newLabelEmployee.emit(this.label);

    // Limpiando la variable para el form
    this.label = '';
  }

  removeItem(id: number) {
    this.idRemoveEmployee.emit(id);
  }
}
