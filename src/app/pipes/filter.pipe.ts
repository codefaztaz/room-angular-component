import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(room: Array<any>, availability: string): Array<any> {
    return room.filter(room => room.availability === 'true');
    //This pipe is not being used by room.component.html
}
  

}
