import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'healthLabelPipe'
})
export class HealthLabelPipePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value.replace(/_/g, ' ');
    }

}
