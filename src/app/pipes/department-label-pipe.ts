import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentLabel',
})
export class DepartmentLabelPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'Engineering' ? '💻 Engineering' :
           value === 'Design' ? '🎨 Design' :
           value === 'Product' ? '📦 Product' : '💼 ' + value;
  }
}
